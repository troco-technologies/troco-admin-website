const Routes = {
auth:{
    path:"/auth/",
    login:{
        path:"/auth/login"
    },
    signup:{
        path:"/auth/signup"
    }
},
dashboard:{
    path:"/dashboard",
    users:{
        path:"/dashboard/users"
    },
    transactions:{
        path:"/dashboard/transactions"
    },
    orders:{
        path:"/dashboard/orders"
    },
    customerCare:{
        path:"/dashboard/customer-service-chat"
    },
    allAdmin:{
        path:"/dashboard/admins"
    },
    allCustomerCare:{
        path:"/dashboard/customer-cares"
    },
    withdrawal:{
        path:"/dashboard/withdrawals"
    },
    bonuses:{
        path:"/dashboard/bonuses"
    },
    kyc:{
        path:"/dashboard/kyc"
    },
    reports:{
        path:"/dashboard/reports"
    },
    notifications:{
        path:"/dashboard/notifications"
    },
    settings:{
        path:"/dashboard/settings"
    }
}
}

export default Routes;