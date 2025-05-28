import * as Yup from "yup"

export const AdminLoginSchemas = Yup.object({
    Username:Yup.string().min(2).max(25).required("Required"),
    password:Yup.string().min(2).max(8).required("Required")
});

export const AdminForgetPasSchemas = Yup.object({
  Passwd:Yup.string().min(2).max(25).required("Required"),
  Cpasword:Yup.string().oneOf([Yup.ref('Passwd'), null], 'Must match "password" field value'),
});

export const AdminProfilSchemas = Yup.object({
   UserName:Yup.string().min(2).max(25).required("Required"),
   Fullname:Yup.string().min(2).max(25).required("Required"),
   ContactNo:Yup.string().min(10).max(10).required("Required"),
   Email:Yup.string().email().required("Required")
});

export const PackageSchemas =Yup.object({
  Name:Yup.string().min(2).max(50).required("Required"),
  Price:Yup.number().required("Required"),
  Month:Yup.date().required("Required"),
  Status:Yup.string().required("Required"), 
  GST:Yup.string().required("Required"), 
  Description:Yup.string().min(2).max(50).required("Required"),
})

export const BusinessregistrationSchemas = Yup.object({
    Bname:Yup.string().min(2).max(25).required("Required"),
    Oname:Yup.string().min(2).max(25).required("Required"),
    Contactno:Yup.number().required("Required"),
    Email:Yup.string().min(2).max(25).required("Required"),
    Gstno:Yup.string().required("Required"),
    Username:Yup.string().min(2).max(15).required("Required"),
    Password: Yup.string().min(8, 'Password must be 8 characters long')
                 .matches(/[0-9]/, 'Password requires a number')
                 .matches(/[a-z]/, 'Password requires a lowercase letter')
                 .matches(/[A-Z]/, 'Password requires an uppercase letter')
                 .matches(/[^\w]/, 'Password requires a symbol'),
    Cpassword:Yup.string().oneOf([Yup.ref('Password'), null], 'Must match "password" field value'),
});

export const UserLoginSchemas = Yup.object({
    Username:Yup.string().min(2).max(25).required("Required"),
    password:Yup.string().min(2).max(10).required("Required")
});

export const SupplirsSchemas = Yup.object({
    Name:Yup.string().min(2).max(25).required("Required"),
    Contactperson:Yup.string().min(2).max(25).required("Required"),
    Phonenoone:Yup.number().required("Required"),
    AlternateNo:Yup.number().required("Required"),
    Email:Yup.string().email().required("Required"),
    Bankname:Yup.string().min(2).max(25).required("Required"),
    Holdername:Yup.string().min(2).max(25).required("Required"),
    Accountno:Yup.string().min(2).max(16).required("Required"),
    Ifsc:Yup.string().min(2).max(15).required("Required"),
    Gstno:Yup.string().min(2).max(15).required("Required"),
    Panno:Yup.string().min(2).max(10).required("Required"),
    Addres:Yup.string().min(2).max(50).required("Required")
});

export const PurchasesSchemas = Yup.object({
    Billdate:Yup.date().required("Required"),
    BillNo:Yup.number().required("Required"),
    GSTValue:Yup.number().min(1).max(100).required("Required"),
    GSTAmount:Yup.number().required("Required"),
    GrossAmount:Yup.number().required("Required"),
    GrandAmount:Yup.number().required("Required"),
    NoticePeriod:Yup.date().required("Required"),
    SupplierId:Yup.number().required("Required"),
    Note:Yup.string().min(2).max(50).required("Required")
});

export const PackagePopupSchemas = Yup.object({
    Name:Yup.string().min(2).max(25).required("Required"),
    Description:Yup.string().min(2).max(50).required("Required"),
    Month:Yup.number().required("Required"),
    GST:Yup.number().min(1).max(100).required("Required"),
    Price:Yup.number().required("Required")
});


export const CategoriesSchemas = Yup.object({
    Name:Yup.string().min(2).max(25).required("Required")
});

export const GarmentProductPopupSchemas = Yup.object({
    GarmentName:Yup.string().min(2).max(25).required("Required"),
    Description:Yup.string().min(2).required("Required"),
    Price:Yup.number().required("Required"), 
    Size:Yup.string().min(2).max(50).required("Required"),
    Color:Yup.string().min(2).max(50).required("Required"),
    CategoryId:Yup.number().required("Required"),
    Brand:Yup.string().min(2).max(50).required("Required"),
    DateAdded:Yup.date().required("Required")
})

export const StockSchemas = Yup.object({
    GarmentName:Yup.string().min(2).max(25).required("Required"),
    Description:Yup.string().min(2).max(25).required("Required"),
    Price:Yup.number().required("Required"),
    Size:Yup.string().required("Required"),
    Color:Yup.string().required("Required"),
    PurchaseId:Yup.number().required("Required"),
    CategoryId:Yup.number().required("Required"),
    Brand:Yup.string().min(2).max(25).required("Required"),
    DateAdded:Yup.date().required("Required"), 
    LastUpdated:Yup.date().required("Required"),
    CostPrice:Yup.number().required("Required"),
    NameModal:Yup.string().min(2).max(8).required("Required")
});

export const ProfileSchema  = Yup.object({
   FinacialYearId:Yup.string().required('Required'),
   Businessname:Yup.string().required('Required'),
   Ownername :Yup.string().required('Required'),
   Contactno:Yup.number().required('Required'),
   Email:Yup.string().email().required('Required'),  
   Bankname:Yup.string().required('Required'), 
   Accountno:Yup.number().required('Required'),
   IFSC:Yup.string().required('Required'),
   Accountholdername:Yup.string().required('Required'), 
   Address:Yup.string().required('Required'), 
   UserName:Yup.string().min(1).max(25).required('Required'), 
   GSTNO:Yup.string().required('Required'),  
   PAN:Yup.string().required('Required')
});
  export const PurchasePaymentSchema = Yup.object({
    Amount:Yup.number().required('Required'), 
     Paymentmode:Yup.string().required('Required'), 
    // Refno:Yup.string().required('Required'), 
    Paymentdate:Yup.string().required('Required')
  });

  export const CustomarSchema = Yup.object({
    Customername:Yup.string().required('Required'),
    ContactNo:Yup.number().required('Required'),
    GSTNO:Yup.string().min(1).max(100).required('Required'),
    Email:Yup.string().email().required('Required'), 
    Address:Yup.string().required('Required')
  });

  export const FinalicayearSchema = Yup.object({
    Name:Yup.string().required('Required')
  });

 

  export const InvoiceSchema = Yup.object({
    //FinancialYearId: Yup.number().required('Required'),
    Customername: Yup.string().min(2).max(25).required('Required'),
    Email: Yup.string().email().required('Required'),
    ContactNo: Yup.number().required('Required'),
    // Biildate: Yup.date().required('Required'),
    // Amount: Yup.string().min(2).max(25).required('Required'),
    Paymentmode: Yup.string().required('Required')
  });

  export const CustomarDues = Yup.object({
    Amount:Yup.number().required('Required'),
    Paymentmode:Yup.string().required('Required'),
    Paymentdate:Yup.date().required('Required'),
  });