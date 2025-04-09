const routes = {
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
    group:{
        path:"/dashboard/group"
    },
    customerCare:{
        path:"/dashboard/customer-service-chat"
    },
    allAdmin:{
        path:"/dashboard/admin"
    },
    allCustomerCare:{
        path:"/dashboard/all-customer-care"
    },
    withdrawal:{
        path:"/dashboard/withdrawal"
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

export default routes;