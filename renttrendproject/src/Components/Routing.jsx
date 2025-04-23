import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import App from '../App'
import Home from './Home'
import Register from './Register'
import Header from './Header'
import Login from './Login'
import Supplier from './Supplier'
import About from './About'
import Product from './Product'
import Cart from './Cart'
import Checkout from './Checkout'
import CheckoutPayment from './CheckoutPayment'
import Footer from './Footer'
import Thankyou from './Thankyou'
import AdminLayout from './Admin/AdminLayout'
import Dashbord from './Admin/Dashbord'
import Viewcategory from './Admin/Viewcategory'
import AddCategory from './Admin/AddCategory'
import AddProducts from './Admin/AddProducts'
import ViewProducts from './Admin/ViewProducts'
import SupplierLayout from './Supplier/SupplierLayout'
import SupplierDashbord from './Supplier/SupplierDashbord'
import SupplierViewCategory from './Supplier/SupplierViewCategory'
import SupplierAddCategory from './Supplier/SupplierAddCategory'
import SupplierAddProduct from './Supplier/SupplierAddProduct'
import SupplierViewProduct from './Supplier/SupplierViewProduct'
import PageNotFound from './PageNotFound'
import MyOrders from './MyOrders'
import MyOrderDetails from './MyOrderDetails'
import Orders from './Admin/Orders'
import OrderDetails from './Admin/OrderDetails'
import ContactUs from './ContactUs'
import ManageReviews from './Admin/ManageReviews'
import SupplierOrder from './Supplier/SupplierOrder'
import SupOrderDetails from './Supplier/SupOrderDetails'
import ManageUser from './Admin/ManageUser'
import EditUser from './Admin/EditUser'
import ManageSupplier from './Admin/ManageSupplier'
import EditSupplier from './Admin/EditSupplier'
import Profile from './Profile'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import { ProtectedAdmin } from './hiddenlinks'
import SupManageReviews from './Supplier/SupManageReviews'

const Routing = () => {
  return (
    <div>
       <Routes>
            <Route path="/" element={<App />}>
    
              <Route element={<><Header/><Outlet/><Footer/></>}>
                <Route path="" element={<Home />}/>
                <Route path="About" element={<About />} />
                <Route path="contactUs" element={<ContactUs />} />
                <Route path="Rentoutfits" element={<Product />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkoutpayment" element={<CheckoutPayment />} />
                <Route path="thankyou" element={<Thankyou/>} />
                <Route path="myorders" element={<MyOrders/>} />
                <Route path="myorders/details/:id" element={<MyOrderDetails/>} />
                <Route path='profile' element={<Profile/>} />

                {/* <Route path="ContactUs" element={<ContactUs />} /> */}
              </Route>

              <Route path='admin' element={<ProtectedAdmin><AdminLayout/></ProtectedAdmin>}>
                       <Route index element={<Dashbord/>}/>
                       <Route path='categories' element={<Viewcategory/>}/>
                       <Route path='categories/add' element={<AddCategory/>}/>
                       <Route path='category/edit/:id' element={<AddCategory/>}/>
              
                       <Route path='add' element={<AddProducts/>}/>
                       <Route path='product/edit/:id' element={<AddProducts/>}/>
              
                       <Route path='view' element={<ViewProducts/>}/>
                       <Route path='orders' element={<Orders/>}/>
                       <Route path='orders/:id' element={<OrderDetails/>}/>
                       <Route path='users' element={<ManageUser/>}/>
                       <Route path='users/edit/:id' element={<EditUser/>}/>
                       <Route path='supplier' element={<ManageSupplier/>}/>
                       <Route path='supplier/edit/:id' element={<EditSupplier/>}/>
                       <Route path='reviews' element={<ManageReviews/>}/>

                       
                       </Route>

                       <Route path='supplier' element={<SupplierLayout/>}>
                       <Route index element={<SupplierDashbord/>}/>
                       <Route path='categories' element={<SupplierViewCategory/>}/>
                       <Route path='categories/add' element={<SupplierAddCategory/>}/>
                       <Route path='category/edit/:id' element={<SupplierAddCategory/>}/>
              
                       <Route path='add' element={<SupplierAddProduct/>}/>
                       <Route path='product/edit/:id' element={<SupplierAddProduct/>}/>
                       <Route path='view' element={<SupplierViewProduct/>}/>
                       <Route path='suporder' element={<SupplierOrder/>}/>
                       <Route path='suporders/:id' element={<SupOrderDetails/>}/>
                       <Route path='review' element={<SupManageReviews/>}/>



                       </Route>

              
                <Route path="Login" element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="Supplierreg" element={<Supplier/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} /> 


            </Route>

            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
    </div>
  )
}

export default Routing
