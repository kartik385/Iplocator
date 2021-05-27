import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IpService } from './../ip.service';
import { Ip } from './../ip.model';
import * as L from 'leaflet';
@Component({
  selector: 'app-resultbar',
  templateUrl: './resultbar.component.html',
  styleUrls: ['./resultbar.component.css']
})
export class ResultbarComponent implements OnInit,OnDestroy {
    private myMap:any;
    ip:Ip={ip:"",isp:"",location:"",timezone:"",cord:[]};
    gotError:boolean=false;
    loading:boolean=true;
    subscriptionPassed: Subscription = new Subscription;
    subscriptionFailed:Subscription=new Subscription;
    loadingNotifier:Subscription=new Subscription;
  constructor(private ipService:IpService ) {
    
  }

  ngOnInit(): void {
    
    this.ipService.getFullDetails();
    this.subscriptionPassed=this.ipService.passed.subscribe((data)=>{
      
      this.ip=data;
      if(this.myMap) {
        this.myMap.remove();
      }
      this.showMap();
      this.gotError=false;
      
    });
    this.subscriptionFailed=this.ipService.failed.subscribe((data)=>this.gotError=data);
    this.ipService.loading.subscribe((data)=>this.loading=data);
    
  }

  showMap(){
    
    console.log(this.ip)
      this.myMap = L.map('map', {
      center: [ this.ip.cord[0], this.ip.cord[1] ],
      zoom: 10
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.myMap);

    let marker = L.marker([this.ip.cord[0], this.ip.cord[1] ]).addTo(this.myMap);
    marker.bindPopup(`<b>${this.ip.isp}</b><br>${this.ip.location}`).openPopup();
    this.myMap.invalidateSize();
     
  }
  ngOnDestroy(){
      this.subscriptionPassed.unsubscribe();
      this.subscriptionFailed.unsubscribe();
      this.loadingNotifier.unsubscribe();
  }

}
