import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogincComponent } from './components/loginc/loginc.component';
// import { AuthGuard } from './services/auth.guard';
import { EditRequirementsComponent } from './components/projectManager/edit-requirements/edit-requirements.component';

import { ProjectRequirementsComponent } from './components/projectManager/project-requirements/project-requirements.component';
import { AppMainComponent } from './app.main.component';
import { DoctorslistComponent } from './components/projectManager/doctorslist/doctorslist.component';
import { PatientlistComponent } from './components/projectManager/patientlist/patientlist.component';
import { EditpatientComponent } from './components/projectManager/editpatient/editpatient.component';
import { ListOfUsersComponent } from './components/projectManager/list-of-users/list-of-users.component';
import { HomeComponent } from './components/projectManager/home/home.component';
import { AdmindbComponent } from './components/admin/admindb/admindb.component';
import { AddusersComponent } from './components/admin/addusers/addusers.component';
import { DoctordbComponent } from './components/doctor/doctordb/doctordb.component';
import { PatientpersonaldataComponent } from './components/doctor/patientpersonaldata/patientpersonaldata.component';
import { PatientdbComponent } from './components/patient/patientdb/patientdb.component';
import { ListofdoctorsComponent } from './components/patient/listofdoctors/listofdoctors.component';
import { EdituserComponent } from './components/admin/edituser/edituser.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { EditprofileComponent } from './components/profile/editprofile/editprofile.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FeedbackComponent } from './components/patient/feedback/feedback.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
           
            {
                path: '', component: LogincComponent
            },
            {path:'login',component:LoginComponent},
            { path:'reg',component:RegisterFormComponent},
            // { path: "log", component: LogincComponent },
            {
                path: 'root', component: AppMainComponent,
                children: [
                    {
                        path: "projectrequirement",
                        component: ProjectRequirementsComponent,
                        // canActivate: [AuthGuard],
                    },
                    // { path: "home", component: HomeComponent },
                    // { path: 'editpatient', component: EditpatientComponent },
                    // { path: 'patientlist', component: PatientlistComponent },
                    // { path: 'doctorslist', component: DoctorslistComponent },
                    // { path: 'requiremenent', component: ProjectRequirementsComponent },
                    { path: 'edit-requiremenent', component: EditRequirementsComponent },
                    // { path: 'userslist', component: ListOfUsersComponent },
                    { path: 'admin', component: AdmindbComponent },
                    { path: 'addusers', component: AddusersComponent },
                    { path: 'edit/:id', component: EdituserComponent },
                    { path: 'doctor', component: DoctordbComponent },
                    { path: 'patientpd/:id', component: PatientpersonaldataComponent },
                    { path: 'patient', component: PatientdbComponent },
                    { path: 'listofdoctors', component: ListofdoctorsComponent },
                    { path: 'profile', component: ProfileComponent },
                    { path: 'editprofile/:id', component: EditprofileComponent },
                    {
                     path:'feedback',component:FeedbackComponent
                    },
                  
                    // { path: 'team', component: TeamComponent },
                    // { path: 'department', component: DepartmentsComponent },
                    // { path: 'job-category', component: JobCategoryComponent },
                    // { path: 'work-location', component: WorkLocationComponent },
                    // { path: 'job-title', component: JobTitleComponent },
                    // { path: 'project-requirements', component: ProjectRequirementsComponent },
                    // { path: 'vendor-asst', component: VendorAsstComponent },
                    // { path: 'verdor-search', component: VendorSearchComponent },
                    // { path: 'verdor-account', component: VendorAccountComponent },
                    // { path: 'verdor-tiers', component: TiersComponent },
                    // { path: 'verdor-defination', component: VendorDefinationComponent },
                    // { path: 'purchas-Requirement', component: PurchasRequirementComponent },
                    // { path: 'task', component: TaskComponent },
                    // { path: 'main', component: AppMainComponent }
                    // { path: '', component: DashboardDemoComponent },
                    // { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
                    // { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
                    // { path: 'uikit/invalidstate', component: InvalidStateDemoComponent },
                    // { path: 'uikit/input', component: InputDemoComponent },
                    // { path: 'uikit/button', component: ButtonDemoComponent },
                    // { path: 'uikit/table', component: TableDemoComponent },
                    // { path: 'uikit/list', component: ListDemoComponent },
                    // { path: 'uikit/tree', component: TreeDemoComponent },
                    // { path: 'uikit/panel', component: PanelsDemoComponent },
                    // { path: 'uikit/overlay', component: OverlaysDemoComponent },
                    // { path: 'uikit/menu', component: MenusDemoComponent },
                    // { path: 'uikit/media', component: MediaDemoComponent },
                    // { path: 'uikit/message', component: MessagesDemoComponent },
                    // { path: 'uikit/misc', component: MiscDemoComponent },
                    // { path: 'uikit/charts', component: ChartsDemoComponent },
                    // { path: 'uikit/file', component: FileDemoComponent },
                    // { path: 'utilities/display', component: DisplayComponent },
                    // { path: 'utilities/elevation', component: ElevationComponent },
                    // { path: 'utilities/flexbox', component: FlexboxComponent },
                    // { path: 'utilities/grid', component: GridComponent },
                    // { path: 'utilities/icons', component: IconsComponent },
                    // { path: 'utilities/widgets', component: WidgetsComponent },
                    // { path: 'utilities/spacing', component: SpacingComponent },
                    // { path: 'utilities/typography', component: TypographyComponent },
                    // { path: 'utilities/text', component: TextComponent },
                    // { path: 'pages/crud', component: AppCrudComponent },
                    // { path: 'pages/calendar', component: AppCalendarComponent },
                    // { path: 'pages/timeline', component: AppTimelineDemoComponent },
                    // { path: 'pages/invoice', component: AppInvoiceComponent },
                    // { path: 'pages/help', component: AppHelpComponent },
                    // { path: 'pages/empty', component: EmptyDemoComponent },
                    // { path: 'documentation', component: DocumentationComponent }
                ]
            },
            {path:'db',component:DashboardComponent},
            // { path: 'error', component: AppErrorComponent },
            // { path: 'access', component: AppAccessdeniedComponent },
            // { path: 'notfound', component: AppNotfoundComponent },
            // { path: 'login', component: AppLoginComponent },
            // { path: 'wizard', component: AppWizardComponent },
            // { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
