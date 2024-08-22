import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/Login-Page/forgotPassword/ForgotPassword";
import MainDashBoard from "../pages/maindashboard/MaindashBoard";
import Setting from "../pages/setting/Setting";
import Notifications from "../pages/notifications/Notifiactions";
import HelpCenter from "../pages/helpCenter/HelpCenter";
import ServiceCenter from "../pages/serviceCenter/ServiceCenter";
import Escalation from "../pages/escalation/Escalation";
import Trc from "../pages/trc/Trc";
import Reports from "../pages/reports/Reports";
import RepairUpdate from "../pages/RepairUpdate/RepairUpdate";
import TicketAcknowledge from "../pages/ticketAcknowledge/TicketAcknowledge";
import PartIssue from "../pages/PartIssue/PartIssue";
import Login from "../pages/Login-Page/login/Login";
import Role from "../pages/setting/User-base/Role";
import User from "../pages/setting/User-base/User";
import Entity from "../pages/setting/User-base/Entity";
import PriceGroup from "../pages/setting/Price/PriceGroup";
import ManageProduct from "../pages/setting/Price/ManageProduct";
import DefectCode from "../pages/setting/Others/DefectCode";
import SymptomCode from "../pages/setting/Others/SymptomCode";
import SymptomGroup from "../pages/setting/Others/SymptomGroup";
import Dashboard from "../pages/inventory/Dashboard";
import ReturnFromEngineer from "../pages/inventory/ReturnFromEngineer";
import RoleMenuMapping from "../pages/setting/menu pages/RoleMenuMapping";
import RepairCode from "../pages/setting/Others/RepairCode";
import PriceType from "../pages/setting/Price/PriceType";

import SparePartCreation from "../Kuldeep/Sparepartcreation/sparePartCreation";

import ManageState from "../pages/Location/manageState/ManageState";
import ManageCity from "../pages/Location/manageCity/ManageCity";
import ManageBrand from "../pages/Product/ManageBrand";
import ManageCategory from "../pages/Product/ManageCategory";
import ManageSubCategory from "../pages/Product/ManageSubCategory";

import SparePartMapping from "../Kuldeep/Sparepartmapping/sparePartMapping";
import Resionmaster from "../Kuldeep/Resionmaster/Resionmaster";
import Warranty from "../Kuldeep/Warranty/warranty";
import Manageservicecharge from "../Kuldeep/Manageservicecharge/manageServiceCharge";
import Manageconfigurationmaster from "../Kuldeep/Manageconfigurationmaster/manageConfigurationMaster";
import Inventorypendingfordispatch from "../Kuldeep/Inventorypendingfordispatch/pendingForDispatch";
import Inventorypartreturn from "../Kuldeep/Inventorypartreturn/partReturn";
import Bufferstocktransfer from "../Kuldeep/Bufferstocktransfer/bufferStockTransfer";
import Repairdashboard from "../Kuldeep/Repairdashboard/Dashboard/Dashboard";
import Dashboardrt from "../Kuldeep/Servicetatdashboard/Dashboardrt";
import Productmodel from "../Kuldeep/Four/Productmodel/productModel";
import Bulkticketupload from "../Kuldeep/Four/Bulkticketupload/Bulkticketupload";
import Uploadstock from "../Kuldeep/Four/Uploadstock/uploadStock";
import Productsku from "../Kuldeep/Four/Productsku/productSku";
import StockGRN from "../pages/inventory/StockGRN";
import CannibalizationReport from '../pages/reports/CannibalizationReport'
import EngineerStockReport from '../pages/reports/EngineerStockReport'
import JobSheetReport from '../pages/reports/JobSheetReport'
import OpenCallReport from '../pages/reports/OpenCallReport'
import StoreStockReport from '../pages/reports/StoreStockReport'
// import Reports from '../pages/reports/Reports'
import JobTrayReport from '../pages/Job Tray/JobTrayReport'

import { AuthRouteWrapper } from "./AuthRouteWrapper";

export const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/dashboard",
    element: <AuthRouteWrapper element={<MainDashBoard />} />,
  },
  { path: "/setting", element: <AuthRouteWrapper element={<Setting />} /> },
  {
    path: "/notifications",
    element: <AuthRouteWrapper element={<Notifications />} />,
  },
  {
    path: "/help-center",
    element: <AuthRouteWrapper element={<HelpCenter />} />,
  },
  {
    path: "/service-center",
    element: <AuthRouteWrapper element={<ServiceCenter />} />,
  },
  {
    path: "/escalation",
    element: <AuthRouteWrapper element={<Escalation />} />,
  },
  { path: "/trc", element: <AuthRouteWrapper element={<Trc />} /> },
  { path: "/reports", element: <AuthRouteWrapper element={<Reports />} /> },
  {
    path: "/repair-update",
    element: <AuthRouteWrapper element={<RepairUpdate />} />,
  },
  {
    path: "/ticket-acknowledge",
    element: <AuthRouteWrapper element={<TicketAcknowledge />} />,
  },
  {
    path: "/part-issue",
    element: <AuthRouteWrapper element={<PartIssue />} />,
  },
  {
    path: "/setting/userbase/role",
    element: <AuthRouteWrapper element={<Role />} />,
  },
  {
    path: "/setting/userbase/user",
    element: <AuthRouteWrapper element={<User />} />,
  },
  {
    path: "/setting/userbase/entity",
    element: <AuthRouteWrapper element={<Entity />} />,
  },
  {
    path: "/setting/price/pricegroup",
    element: <AuthRouteWrapper element={<PriceGroup />} />,
  },
  {
    path: "/setting/price/manageproduct",
    element: <AuthRouteWrapper element={<ManageProduct />} />,
  },
  {
    path: "/setting/others/defectcode",
    element: <AuthRouteWrapper element={<DefectCode />} />,
  },
  {
    path: "/setting/others/repaircode",
    element: <AuthRouteWrapper element={<RepairCode />} />,
  },
  {
    path: "/setting/others/symptomcode",
    element: <AuthRouteWrapper element={<SymptomCode />} />,
  },
  {
    path: "/setting/others/symptomgroup",
    element: <AuthRouteWrapper element={<SymptomGroup />} />,
  },
  {
    path: "/inventory/dashboard",
    element: <AuthRouteWrapper element={<Dashboard />} />,
  },
  {
    path: "/inventory/returnfromengineer",
    element: <AuthRouteWrapper element={<ReturnFromEngineer />} />,
  },
  {
    path: "/setting/menu/rolemenumapping",
    element: <AuthRouteWrapper element={<RoleMenuMapping />} />,
  },
  {
    path: "/setting/price/pricetype",
    element: <AuthRouteWrapper element={<PriceType />} />,
  },
  {
    path: "/sparePartCreation",
    element: <AuthRouteWrapper element={<SparePartCreation />} />,
  },
  {
    path: "/location/manageState",
    element: <AuthRouteWrapper element={<ManageState />} />,
  },
  {
    path: "/location/manageCity",
    element: <AuthRouteWrapper element={<ManageCity />} />,
  },
  {
    path: "/product/manageBrand",
    element: <AuthRouteWrapper element={<ManageBrand />} />,
  },
  {
    path: "/product/managecategory",
    element: <AuthRouteWrapper element={<ManageCategory />} />,
  },
  {
    path: "/Manageservicecharge",
    element: <AuthRouteWrapper element={<Manageservicecharge />} />,
  },
  {
    path: "/product/managesubcategory",
    element: <AuthRouteWrapper element={<ManageSubCategory />} />,
  },
  {
    path: "/sparePartMapping",
    element: <AuthRouteWrapper element={<SparePartMapping />} />,
  },
  {
    path: "/resionmaster",
    element: <AuthRouteWrapper element={<Resionmaster />} />,
  },
  { path: "/warranty", element: <AuthRouteWrapper element={<Warranty />} /> },
  {
    path: "/manageconfigurationmaster",
    element: <AuthRouteWrapper element={<Manageconfigurationmaster />} />,
  },
  {
    path: "/inventorypendingfordispatch",
    element: <AuthRouteWrapper element={<Inventorypendingfordispatch />} />,
  },
  {
    path: "/inventorypartreturn",
    element: <AuthRouteWrapper element={<Inventorypartreturn />} />,
  },
  {
    path: "/bufferstocktransfer",
    element: <AuthRouteWrapper element={<Bufferstocktransfer />} />,
  },
  {
    path: "/repairdashboard",
    element: <AuthRouteWrapper element={<Repairdashboard />} />,
  },
  {
    path: "/dashboardrt",
    element: <AuthRouteWrapper element={<Dashboardrt />} />,
  },
  {
    path: "/productmodel",
    element: <AuthRouteWrapper element={<Productmodel />} />,
  },
  {
    path: "/bulkticketupload",
    element: <AuthRouteWrapper element={<Bulkticketupload />} />,
  },
  {
    path: "/uploadstock",
    element: <AuthRouteWrapper element={<Uploadstock />} />,
  },
  {
    path: "/productsku",
    element: <AuthRouteWrapper element={<Productsku />} />,
  },
  // element: <JobSheetReport />
  { path: "/inventory/stockgrn", element: <AuthRouteWrapper element={<StockGRN />} /> },
  { path: "/jobtrayprint", element: <AuthRouteWrapper element={<JobTrayReport />}/> },
  { path: "/reports/jobsheetreports", element: <AuthRouteWrapper element={<JobSheetReport />}/>},
  { path: "/reports/storestockreports", element: <AuthRouteWrapper element={<StoreStockReport />}/>},
  { path: "/reports/engineerstockreports", element: <AuthRouteWrapper element={<EngineerStockReport />}/>},
  {
    path: "/reports/cannibalizationreports",
    element: <AuthRouteWrapper element={<CannibalizationReport />}/>,
  },
  { path: "/reports/opencallreports", element: <AuthRouteWrapper element={<OpenCallReport />}/>},
]);

// export const appRouter = createBrowserRouter([
//   { path: "/", element: <Login /> },
//   { path: "/SparePartCreation", element: <SparePartCreation /> },
//   { path: "/login", element: <Login /> },
//   { path: "/forgot-password", element: <ForgotPassword /> },
//   { path: "/dashboard", element: <MainDashBoard /> },
//   { path: "/setting", element: <Setting /> },
//   { path: "/notifications", element: <Notifications /> },
//   { path: "/help-center", element: <HelpCenter /> },
//   { path: "/service-center", element: <ServiceCenter /> },
//   { path: "/escalation", element: <Escalation /> },
//   { path: "/trc", element: <Trc /> },
//   { path: "/reports", element: <Reports /> },
//   { path: "/repair-update", element: <RepairUpdate /> },
//   { path: "/ticket-acknowledge", element: <TicketAcknowledge /> },
//   { path: "/part-issue", element: <PartIssue /> },
//   { path: "/setting/userbase/role", element: <Role /> },
//   { path: "/setting/userbase/user", element: <User /> },
//   { path: "/setting/userbase/entity", element: <Entity /> },
//   { path: "/setting/price/pricegroup", element: <PriceGroup /> },
//   { path: "/setting/price/manageproduct", element: <ManageProduct /> },
//   { path: "/setting/others/defectcode", element: <DefectCode /> },
//   { path: "/setting/others/repaircode", element: <RepairCode /> },
//   { path: "/setting/others/symptomcode", element: <SymptomCode /> },
//   { path: "/setting/others/symptomgroup", element: <SymptomGroup /> },
//   { path: "/inventory/dashboard", element: <Dashboard /> },
//   { path: "/inventory/returnfromengineer", element: <ReturnFromEngineer /> },
//   { path: "/setting/menu/rolemenumapping", element: <RoleMenuMapping /> },
//   { path: "/setting/price/pricetype", element: <PriceType /> },
//   { path: "/Product/managecategory", element: <ManageCategory /> },
//   { path: "/Product/managesubcategory", element: <ManageSubCategory /> },
//   { path: "/sparePartMapping", element: <SparePartMapping /> },
//   { path: "/Location/manageState", element: <ManageState /> },
//   { path: "/Location/manageCity", element: <ManageCity /> },
//   { path: "/Product/manageBrand", element: <ManageBrand /> },
//   { path: "/Resionmaster", element: <Resionmaster /> },
//   { path: "/warranty", element: <Warranty /> },
//   { path: "/Manageservicecharge", element: <Manageservicecharge /> },
//   { path: "inventory/stockgrn", element: <StockGRN /> },
//   { path: "Manageconfigurationmaster", element: <Manageconfigurationmaster /> },
//   {
//     path: "Inventorypendingfordispatch",
//     element: <Inventorypendingfordispatch />,
//   },
//   { path: "Inventorypartreturn", element: <Inventorypartreturn /> },
//   { path: "Bufferstocktransfer", element: <Bufferstocktransfer /> },
//   { path: "Repairdashboard", element: <Repairdashboard /> },
//   { path: "Dashboardrt", element: <Dashboardrt /> },
//   { path: "/Productmodel", element: <Productmodel /> },
//   { path: "Bulkticketupload", element: <Bulkticketupload /> },
//   { path: "Uploadstock", element: <Uploadstock /> },
//   { path: "Productsku", element: <Productsku /> },
// ]);
