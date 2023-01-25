import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  data: any = {}
  constructor(private http: HttpClient) { }
  doctorsList = [
    {
      img: 'assets/images/doctor1.jfif',
      name: 'Bhaskar',
      designation: 'M.B.B.S, MS(Master of Surgery)',
      availabletime: '11 A.M to 10 P.M'
    },
    {
      img: 'assets/images/doctor2.jfif',
      name: 'Vijay',
      designation: 'M.B.B.S, MS(Master of Surgery)',
      availabletime: '2 P.M to 11 P.M'
    },
    {
      img: 'assets/images/doctor3.jfif',
      name: 'Jhansi',
      designation: 'B.D.S( Bachelor of Dental Surgery)',
      availabletime: '10 A.M to 8 P.M'
    },
    {
      img: 'assets/images/doctor5.jfif',
      name: 'Naga',
      designation: 'M.B.B.S, Child Specialist',
      availabletime: '9 A.M to 8 P.M'
    },
    {
      img: 'assets/images/doctor4.jfif',
      name: 'Sai',
      designation: 'B.A.M.S( Bachelor of Ayurvedic Medicine and Surgery)',
      availabletime: '10 A.M to 8 P.M'
    },
    {
      img: 'assets/images/doctor6.jfif',
      name: 'Teja',
      designation: 'B.U.M.S(Bachelor of Unani Medicine and Surgery)',
      availabletime: '10 A.M to 9 P.M'
    },
    {
      img: 'assets/images/doctor7.jfif',
      name: 'Surya',
      designation: 'B.H.M.S(Bachelor of Homeopathy Medicine and Surgery)',
      availabletime: '8 A.M to 5 P.M'
    },
    {
      img: 'assets/images/doctor8.jfif',
      name: 'Varma',
      designation: 'B.U.M.S(Bachelor of Unani Medicine and Surgery)',
      availabletime: '2 p.M to 2 A.M'
    }
  ]
  slotsarray=[[{ h: '10:00' }, { h: '10:15' }, { h: '10:30' }, { h: '10:45' }, { h: '11:00' }, { h: '11:15' },
   { h: '11:30' }],[{ h: '10:00' }, { h: '10:15' }, { h: '10:30' }, { h: '10:45' }, { h: '11:00' }, { h: '11:15' }, { h: '11:30' }]]

  //login api
  loginVerification(body: any) {
    return this.http.post('http://172.17.12.65:8000/users/login', body)
  }
  //admin api's
  geUserstData() {
    return this.http.get('http://172.17.12.65:8000/listofusers')
  }
  postUserData(reqBody: any) {
    console.log("postdata:");
    return this.http.post('http://172.17.12.65:8000/postuserdata', reqBody);
  }
  getUserById(Id: any) {
    console.log(Id);
    return this.http.get('http://172.17.12.65:8000/idbased/' +Id)
  }
  updateUsersData(data: any, id: any) {
    console.log(data);
    console.log(id);
    return this.http.put('http://172.17.12.65:8000/updateuserdata/'+id, data)
  }
  deleteUser(id: any) {
    console.log(id);
    return this.http.delete('http://172.17.12.65:8000/deleteuser/' + id);
  }
  //doctor api's
  getDoctorsdata() {
    return this.http.get('http://172.17.12.65:8000/listofrole/doctor')
  }
  bookDoctor(reqBody:any){
    console.log(reqBody);
    return this.http.post("http://172.17.12.65:8000/appointments",reqBody);
  }
  // getFeedBack(reqBody:any){
  //   console.log(reqBody);
  //   return this.http.post
  // }
  //patient api's
  getPatientData(id:any) {
    console.log(id);
    return this.http.get('http://172.17.12.65:8000/users/patientdata/'+id);
  }
  getDeletePatient(id:any){
    console.log(id);
    return this.http.delete("http://172.17.12.65:8000/users/deleteslot/"+id)
  }
  getprescription(id:any,reqBody){
    console.log(id);
    console.log(reqBody);
    return this.http.put('http://172.17.12.65:8000/updateuserdata/'+id,reqBody); 
  }

  getSlotTime() {
   
    return this.http.get('http://172.17.12.65:8000/listofappointments');
  }

}
