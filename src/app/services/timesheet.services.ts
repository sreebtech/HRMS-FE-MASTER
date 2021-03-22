import { Injectable } from '@angular/core';
import { task } from '../models/task';
import { department } from '../models/department';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { project } from '../models/project';
import { clients } from '../models/clients';
import { user } from '../models/user';
import { loginDetails } from '../models/loginDetails';
import { timeSheet } from '../models/timeSheet';
import { changePassword } from '../models/changePassword';
import { taskPhase } from '../models/taskPhase';
import { taskAssign } from '../models/taskAssign';
import {subscription} from '../models/subscription'

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
  };

  constructor(private hClient: HttpClient) {
  }
/* save subscription */

savesubscription(subscription:subscription):Observable<any>{

  return this.hClient.post('http://localhost:7000/savesubscription', JSON.stringify(subscription), this.httpOptions);
}

/* get All Subscriptions */

getallSubscriptions():Observable<any>{
  return this.hClient.get('http://localhost:7000/savesubscription', { responseType: 'json' });
}
  /*Save User*/
  saveUser(user: user): Observable<any> {

    return this.hClient.post('http://localhost:7000/employee', JSON.stringify(user), this.httpOptions);
  }

  //getUser
  GetAllusers(): Observable<any> {
    return this.hClient.get('http://localhost:7000/employee', { responseType: 'json' });
  }
  //getUser details by manager Id
  getUsersByManagerId(managerId: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/employeeByManagerId/' + managerId, { responseType: 'json' });
  }
  //getUsers By id
  getUsersById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/employeeById/' + id, { responseType: 'json' });
  }

  /* user by id */
  GetUsersById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/employee/' + id, { responseType: 'json' });
  }

  getEmployeeDetailsByid(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getEmployeeDetailsByid/' + id, { responseType: 'json' });
  }


  //get user by role
  GetAllUsersByRole(): Observable<any> {
    return this.hClient.get('http://localhost:7000/employeeByRole', { responseType: 'json' });

  }
  /* upadate for users */
  updateUsers(user: user): Observable<any> {

    return this.hClient.post('http://localhost:7000/employeeUpdate', JSON.stringify(user), this.httpOptions);
  }

  updateUsersstatus(id: number,usr: user): Observable<any> {

    return this.hClient.post('http://localhost:7000/updateUsersstatus/'+id, JSON.stringify(usr), this.httpOptions);
  }
  /* for deprtments */

  //save departments

  saveDepartment(dept: department): Observable<any> {

    return this.hClient.post('http://localhost:7000/department', JSON.stringify(dept), this.httpOptions);
  }

  /* update department*/
  updateDepartment(dept: department): Observable<any> {

    return this.hClient.post('http://localhost:7000/departmentUpdate', JSON.stringify(dept), this.httpOptions);
  }

  //get departments
  GetAlldepartments(): Observable<any> {
    return this.hClient.get('http://localhost:7000/department', { responseType: 'json' });
  }
  GetDepartmentsById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/department/' + id, { responseType: 'json' });
  }

  /* for clients */
  //save CLIENTS
  saveClients(clnt: clients): Observable<any> {

    return this.hClient.post('http://localhost:7000/clients', JSON.stringify(clnt), this.httpOptions);
  }
  //get CLIENTS
  GetAllClients(): Observable<any> {
    return this.hClient.get('http://localhost:7000/clients', { responseType: 'json' });
  }

  //get ClientStatus
  GetAllClientsByStatus(): Observable<any> {
    return this.hClient.get('http://localhost:7000/clientStatus', { responseType: 'json' });
  }

  /* get clients by Id */
  GetClientsById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetClientsById/' + id, { responseType: 'json' });
  }
  // update clients
  updateClients(clnt: clients): Observable<any> {

    return this.hClient.post('http://localhost:7000/clientsUpdate', JSON.stringify(clnt), this.httpOptions);
  }


  updateClientstatus(id: number,clnt: clients): Observable<any> {

    return this.hClient.post('http://localhost:7000/clientStatusUpdate/'+id, JSON.stringify(clnt), this.httpOptions);
  }

  /* for projects */

  //save project
  saveProject(prjct: project): Observable<any> {
    return this.hClient.post('http://localhost:7000/project', JSON.stringify(prjct), this.httpOptions);
  }

  updateProjects(prjct: project): Observable<any> {

    return this.hClient.post('http://localhost:7000/projectUpdate', JSON.stringify(prjct), this.httpOptions);
  }


  updateProjectstatus(id: number,prjct: project): Observable<any> {

    return this.hClient.post('http://localhost:7000/projectStatusUpdate/'+id, JSON.stringify(prjct), this.httpOptions);
  }

  //get project
  GetAllProjects(): Observable<any> {
    return this.hClient.get('http://localhost:7000/projects', { responseType: 'json' });
  }
  GetAllprojectsBystatus(): Observable<any> {
    return this.hClient.get('http://localhost:7000/projectsByStatus', { responseType: 'json' });
  }

  //get project by clientID
  GetProjectsByClientId(clientId:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getProjectsByClientId/'+clientId, { responseType: 'json' });
  }

  GetProjectsById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/projects/' + id, { responseType: 'json' });
  }


  getProjectDetailsByid(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getProjectDetailsByid/' + id, { responseType: 'json' });
  }


  // taskphase
  SaveTaskPhase(tskphs: taskPhase): Observable<any> {
    return this.hClient.post('http://localhost:7000/taskPhase', JSON.stringify(tskphs), this.httpOptions);
  }
  GetAllTaskPhases(): Observable<any> {
    return this.hClient.get('http://localhost:7000/taskphases', { responseType: 'json' });
  }
  GetTaskPhaseById(id:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/taskphasesById/'+id, { responseType: 'json' });
  }
  getTaskPhaseByProjectId(id:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/taskphasesByProjectId/'+id, { responseType: 'json' });
  }
  UpateTaskPhase(tskphs: taskPhase): Observable<any> {
    return this.hClient.post('http://localhost:7000/taskPhaseUpdate', JSON.stringify(tskphs), this.httpOptions);
  }
/*for adding tasks*/
SaveTask(tsk: task): Observable<any> {

  return this.hClient.post('http://localhost:7000/taskAdd', JSON.stringify(tsk), this.httpOptions);
}

getAllAddedTasks(): Observable<any> {
  return this.hClient.get('http://localhost:7000/getAllAddedTasks', { responseType: 'json' });
}
getAllTasksById(id:any): Observable<any> {
  return this.hClient.get('http://localhost:7000/getAllTasksById/'+id, { responseType: 'json' });
}
UpdateTask(tsk: task): Observable<any> {

  return this.hClient.post('http://localhost:7000/taskUpdate', JSON.stringify(tsk), this.httpOptions);
}
getTasksByTaskPhaseId(id:any): Observable<any> {
  return this.hClient.get('http://localhost:7000/getTasksByTaskPhaseId/'+id, { responseType: 'json' });
}

getAllAssignedTasks(): Observable<any> {
  return this.hClient.get('http://localhost:7000/getAllAssignedTasks', { responseType: 'json' });
}

/* get all tasks for reports */
GetAllTask():Observable<any> {
  return this.hClient.get('http://localhost:7000/GetAllTask',{responseType:'json'});
}

updateTaskstatus(id: number,tsk: task): Observable<any> {

  return this.hClient.post('http://localhost:7000/taskStatusUpdate/'+id, JSON.stringify(tsk), this.httpOptions);
}

/* get reports for all tasks */
GetReportsByTaskId(sortTaskId:any):Observable<any> {
return this.hClient.get('http://localhost:7000/GetReportsByTaskId'+sortTaskId,{responseType:'json'})
}
  /* for assigning Task */

  //save task
  saveTaskAssign(tsk: taskAssign): Observable<any> {

    return this.hClient.post('http://localhost:7000/taskAssign', JSON.stringify(tsk), this.httpOptions);
  }

  /* for update task */
  UpdateTaskAssign(tsk: taskAssign): Observable<any> {

    return this.hClient.post('http://localhost:7000/taskAssignUpdate', JSON.stringify(tsk), this.httpOptions);
  }
  //get task

  GetAllTasks(): Observable<any> {
    return this.hClient.get('http://localhost:7000/taskAssign', { responseType: 'json' });
  }

  /* get tasks by id */
  getTasksById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/taskById/' + id, { responseType: 'json' });
  }

    /* get tasks by week */

  GetWeek(date: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getweek/' + date, { responseType: 'json' });
  }
  getForGraph(id:any,sd: any,ed:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getForGraph/' +id+'/'+sd+'/'+ed, { responseType: 'json' });
  }

    /* get tasks by taskid */

    getAllAssignedTasksById(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getAllAssignedTasksById/' + id, { responseType: 'json' });
  }

  /* for login */

  Savelogin(email: any, pwd: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/emp_login/' + email + '/' + pwd, { responseType: 'json' });
  }
  /*get roles*/
  GetAllRoles(): Observable<any> {
    return this.hClient.get('http://localhost:7000/roles', { responseType: 'json' });
  }

  //get Time Sheet

  verifyTimeSheet(pid: any, tid: any, wrkd: any, empId: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getTimeSheetByDetails/' + pid + '/' + tid + '/' + wrkd + '/' + empId, { responseType: 'json' });
  }

  //get All time sheet by employee id

  getAllTimeSheetByEmpID(empId: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getAllTimeSheetByEmpId/' + empId, { responseType: 'json' });
  }
  addTimeSheet(ts: timeSheet): Observable<any> {
    return this.hClient.post('http://localhost:7000/timeSheetEntry', JSON.stringify(ts), this.httpOptions);
  }
  updateTimeSheet(hrs: any): Observable<any> {
    return this.hClient.post('http://localhost:7000/timeSheetEntryUpdate/', JSON.stringify(hrs), this.httpOptions);
  }


  getApprovalPendingTimeSheetByEmpId(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getApprovalPendingTimeSheetByEmpId/'+id, { responseType: 'json' });
  }

  GetTimeSheetByDateAndEmpId(sd: any, ed: any, id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getSheetByDateAndEmpId/' + id + '/' + sd + '/' + ed, { responseType: 'json' });
  }
  sendWeeklyReportToManager(sd: any, ed: any, id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/sendWeeklyReportToManager/' + id + '/' + sd + '/' + ed, { responseType: 'json' });
  }

  StatusUpdateByManager(tid: any, sd: any, sts: any, eid: any) {
    return this.hClient.get('http://localhost:7000/StatusUpdateByManager/' + tid + '/' + eid + '/' + sd + '/' + sts, { responseType: 'json' });

  }
  /* save change password */
  changepassword(changePassword: changePassword): Observable<any> {
    return this.hClient.post('http://localhost:7000/changePassword/', JSON.stringify(changePassword), this.httpOptions);
  }

  /* get all approved reports*/
  GetApprovedReportsByEmpId(sortEmpId: any,sortSdt: any, sortEdt: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetApprovedReportsByEmpID/' + sortEmpId+ '/' + sortSdt + '/' + sortEdt, { responseType: 'json' });
  }
  GetApprovedReportsByProId(sortProId: any,sortSdt: any, sortEdt: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetApprovedReportsByProID/' + sortProId + '/' + sortSdt + '/' + sortEdt, { responseType: 'json' });
  }
  GetApprovedReports(): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetApprovedReports', { responseType: 'json' });
  }
  GetApprovedReportsByManagerId(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetApprovedReportsByManagerId/' + id, { responseType: 'json' });
  }
  getAllApprovalPendingTimeSheetByManagerId(id: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getAllApprovalPendingTimeSheetByManagerId/' + id, { responseType: 'json' });
  }
  getAllApprovalPendingTimeSheet(): Observable<any> {
    return this.hClient.get('http://localhost:7000/getAllApprovalPendingTimeSheet', { responseType: 'json' });
  }
  GetApprovedReportsByDateRange(sortSdt: any, sortEdt: any): Observable<any> {
    return this.hClient.get('http://localhost:7000/GetApprovedReportsByDateRange/' + sortSdt + '/' + sortEdt, { responseType: 'json' });
  }
  getDetailsByProjectId(id:any,sts:any,sd:any,ed:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/getDetailsByProjectId/'+id+'/'+sts+'/'+sd+'/'+ed, { responseType: 'json' });
  }
  // forgot password
  verifyEmail(email: any,mbl:any,pwd:any): Observable<any> {
    return this.hClient.get('http://localhost:7000/verifyEmailAndMobile/' +email+'/'+mbl+'/'+pwd, { responseType: 'json' });
  }
  //get Projects for timesheet employee select project 
  GetAllProjectsDetails(): Observable<any> { 
    return this.hClient.get('http://localhost:7000/allProjects', { responseType: 'json' }); 
  } 
  //get Auto increment id for timesheet employee enter task 
 
  Getautoincrement(): Observable<any> { 
    return this.hClient.get('http://localhost:7000/Getautoincrement', { responseType: 'json' }); 
  }
}






