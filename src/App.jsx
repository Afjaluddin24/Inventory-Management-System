import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Admin/Footer";
import HaideMenu from "./Admin/HaideMenu";
import MainMenu from "./Admin/MainMenu";
import Sidebarsetting from "./Admin/Sidebarsetting";
import SideMenu from "./Admin/SideMenu";
import Login from "./Admin/Login";
import Paccage from "./Admin/Display/Paccage";
import BusinessSidMenu from "./Business/BusinessSidMenu";
import BuesinessHaiderMenu from "./Business/BuesinessHaiderMenu";
import BuesessDashboard from "./Business/BuesessDashboard";
import BuesinessSidebarsetting from "./Business/BuesinessSidebarsetting";
import BusinessRegistration from "./Business/BusinessRegistration";
import BusinessProfile from "./Business/BusinessProfile";
import BuesinessFooter from "./Business/BuesinessFooter";
import BusinessLogin from "./Business/BusinessLogin";
import Supplieradd from "./Business/Page/Supplieradd";
import Purchase from "./Business/Page/Purchase";
import PurchasePayment from "./Business/Page/PurchasePayment";
import Purchreturn from "./Business/Page/Purchreturn";
import Categories from "./Business/Page/Categories";
import Stock from "./Business/Page/Stock";
import Invoice from "./Business/Page/Invoice";
import FinacialYear from "./Business/Page/FinacialYear";
import DisplayInvoice from "./Business/Page/DisplayInvoice";
import PrintReceipt from "./Business/Page/PrintReceipt";
import AvailableStock from "./Business/Page/AvailableStock";
import SalseReturn from "./Business/Page/SalseReturn";
import CustomerDues from "./Business/Page/CustomerDues";
import CustomerPayment from "./Business/Page/CustomerPayment";
import ReportPurchase from "./Report/ReportPurchase";
import ReportStock from "./Report/ReportStock";
import ReportInvoic from "./Report/ReportInvoic";
import ReportCustomerInstalman from "./Report/ReportCustomerInstalman";
import ReportStockSeal from "./Report/ReportStockSeal";
import Home from "./Business/Home";
import Customer from "./Admin/Display/Customer";
import ReportSuppler from "./Report/ReportSuppler";
import PrintSalseReturn from "./Business/Page/PrintSalseReturn";
import DisplaySalesReturn from "./Business/Page/DisplaySalseReturn";
import ProfileAdmin from "./Admin/ProfileAdmin";
import ListPaceg from "./Business/ListPaceg";
import DisplayCoutomer from "./Admin/Display/DisplayCoutomer";
import PieChartBrand from "./Business/Chart/PieChartBrand";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={[<Home />]} />
            {/*Admin Login Page */}
            <Route path="/Logins" element={[<Login />]} />

            <Route
              path="/Admin/Home"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <SideMenu />,<HaideMenu />,<MainMenu />,<Footer />
                  </div>
                  <Sidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Admin/Profile"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <SideMenu />,<HaideMenu />,<ProfileAdmin />,<Footer />
                  </div>
                  <Sidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Admin/Package"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <SideMenu />,<HaideMenu />,<Paccage />,<Footer />
                  </div>
                  <Sidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Admin/Customer/Package"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <SideMenu />,<HaideMenu />,<DisplayCoutomer />,<Footer />
                  </div>
                  <Sidebarsetting />
                </div>,
              ]}
            />
            <Route path="/User/Package" element={[<ListPaceg />]} />

            <Route
              path="/Admin/User"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <SideMenu />,<HaideMenu />,<Customer />,<Footer />
                  </div>
                  <Sidebarsetting />
                </div>,
              ]}
            />

            {/*Buesiness using a */}

            <Route path="/Registration" element={[<BusinessRegistration />]} />
            <Route path="/Login" element={[<BusinessLogin />]} />
            <Route
              path="/BuesinessDashbord"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <BuesessDashboard />,<BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Profile"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <BusinessProfile />,<BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Supplier"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Supplieradd />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Purchase"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Purchase />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/PurchasePayments"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <PurchasePayment />,<BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/PurchaseReturn"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Purchreturn />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Categories"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Categories />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Stock"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Stock />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/AvailableStock"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <AvailableStock />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/FinacialYear"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<FinacialYear />
                    ,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/Invoice"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<Invoice />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/PrintReceipt/:InvoiceId"
              element={[<PrintReceipt />]}
            />
            <Route
              path="/PrintSalseReturn/:SalseRetunId"
              element={[<PrintSalseReturn />]}
            />
            <Route
              path="/DisplaySalesReturn"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <DisplaySalesReturn />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/SalseReturn"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,<SalseReturn />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/DisplayInvoice"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <DisplayInvoice />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/CustomerDues"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <CustomerDues />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/CustomerPayment"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <CustomerPayment />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportPurchase"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportPurchase />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportSuppler"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportSuppler />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportStock"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportStock />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportInvoie"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportInvoic />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportCustomerInstallment"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportCustomerInstalman />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
            <Route
              path="/ReportStockSeal"
              element={[
                <div className="wrapper">
                  <div id="main-wrapper" className="menu-fixed page-hdr-fixed">
                    <BusinessSidMenu />,<BuesinessHaiderMenu />,
                    <ReportStockSeal />,
                    <BuesinessFooter />
                  </div>
                  <BuesinessSidebarsetting />
                </div>,
              ]}
            />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </>
  );
}
export default App;
