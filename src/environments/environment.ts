// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseUrl = "https://portal-api.servicesbay.com/v1";
export const environment = {
  production: false,
  
  logInData: baseUrl + "/user-login",
  lookupsData: baseUrl + "/look-up/",
  requirementGrid: baseUrl + "/requirements",
  positionCat: baseUrl + "/account/job-category",
  jobTitle: baseUrl + "/account/job-title/",
  departments: baseUrl + "/departments",
  location: baseUrl + "/location",
  addReq: baseUrl + "/requirement",
  requirementEdit: baseUrl + "/requirement",
  avaliableSubmitedPro: baseUrl + "/requirement/submitted-profiles/",
  getRealeseReq: baseUrl + "/requirement/release/",
  submitedProfiles: baseUrl + "/requirements/submitted-profiles/",
  //Purchasing roles Apis End Poins
  getTeamsData: baseUrl + "/contacts/",
  getDepartment: baseUrl + "/departments",
  addDepartment: baseUrl + "/department",
  editTable: baseUrl + "/department",
  fileuploadDepartments: baseUrl + "/department-xlsx?file=",
  vendorAccsocitegrid: baseUrl + "/vendors/associated/",
  states: baseUrl + "/states/",
  activeVendorGrid: baseUrl + "/vendors/active/",
  gettitleTable: baseUrl + "/account/job-title/list?",
  addTitle: baseUrl + "/account/job-title",
  jobCategoryDD: baseUrl + "/account/job-categorys/list",
  updateTitle: baseUrl + "/account/job-title",
  fileuploadJobTitle: baseUrl + "/job-title-xlsx?file",
  getTable: baseUrl + "/account/job-categorys/list",
  addCategory: baseUrl + "/account/job-category",
  editCategory: baseUrl + "/account/job-category",
  fileuploadJobCategory: baseUrl + "/job-category-xlsx?file=",
  getLocation: baseUrl + "/locations/",
  fileuploadWorkLocation: baseUrl + "/worklocation-xlsx?file=",
  locationEdit: baseUrl + "/location",
  vendorTier: baseUrl + "/tiers/",
  tiers: baseUrl + "/tiers",
  getTiresWithVendor: baseUrl + "/vendor/tiers/",
  getUpdateVendorTier: baseUrl + "/vendor/tier",
  accountget: baseUrl + "/account/",
  gettaskTable: baseUrl + "/activity/",
taskstateDD: baseUrl + "/look-up/TLTS",
assignedTo: baseUrl + "/contacts/",
updatetask: baseUrl + "/task",
addTask: baseUrl + "/task",
getCustomerList: baseUrl + "/customers/",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
