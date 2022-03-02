import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  readData:any;
  successmsg:any;

  ngOnInit(): void {
    this.getAllData();
     

   
  }

  //get delete id
  deleteID(id:any){
    console.log(id,"delete id");
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,"delete data");
      this.successmsg = res.message;
      this.getAllData();

      

    })
  }
//get all data
  getAllData(){
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res=>")

      this.readData = res.data;
     

    });

  }

}
