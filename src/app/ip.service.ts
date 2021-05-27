import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import {map} from "rxjs/operators"
import { Ip } from './ip.model';

@Injectable({providedIn:'root'})
export class IpService implements OnDestroy{

 
    subscription1:Subscription=new Subscription;

    apikey:string="at_L4CFS0h2doAM8hlvE79LI79Aw1Yyb";

    gotIp=new Subject<string>();
    failed=new Subject<boolean>();
    passed=new Subject<Ip>();
    loading=new Subject<boolean>();
    constructor(private http:HttpClient){

    }

    getFullDetails(){
        this.getIp();
        this.subscription1=this.gotIp.subscribe((data:string)=>{
            this.getResult(data);
        });
    }
    
    

    getResult(ipData:string){
           
                this.loading.next(true);
                this.http.get<{ip:string,location:{city:string,region:string,country:string,timezone:string,lat:number,lng:number},isp:string}>(
                    
                    `https://geo.ipify.org/api/v1?apiKey=${this.apikey}&ipAddress=${ipData}` 
                ).pipe(map(
                    (data)=>{
                       
                        return new Ip(data.ip,`${data.location.city}, ${data.location.region}, ${data.location.country}`,data.location.timezone,data.isp,[data.location.lat,data.location.lng]);
                    }
                )).subscribe(
                    (data:Ip)=>{
                        this.loading.next(false);
                        this.passed.next(data);
                       
                    },(error)=>{
                        this.loading.next(false);
                        this.failed.next(true);
                        
                    }
                );
            
            
            
    }

    getIp(){
        this.loading.next(true);
            this.http.get<{ip:string}>("https://api64.ipify.org?format=json").pipe(map(
                (data)=>{
                    return data.ip;
                }
            )).subscribe(
                (data:string)=>{
                    this.loading.next(true);
                   this.gotIp.next(data);
                },(error)=>{
                    this.loading.next(false);
                    this.failed.next(true);
                }
            );
            
            
    }

    ngOnDestroy(){
        this.subscription1.unsubscribe();
    }
}