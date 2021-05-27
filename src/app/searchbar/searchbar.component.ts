import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IpService } from './../ip.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private ipService:IpService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.ipService.getResult(form.value.ip);
  }

}
