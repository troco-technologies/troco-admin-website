'use client'
import routes from '@/app/routes';
import { useAdmin } from '@/providers/AdminProvider';
import { JSX } from 'react';
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { TbCashBanknoteFilled } from "react-icons/tb";
import { FaRepeat } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi"
import { IoWallet } from 'react-icons/io5';
import { GrMoney } from 'react-icons/gr';
import { MdSpaceDashboard } from "react-icons/md";
import { PiWarningCircleFill, PiWechatLogoFill } from "react-icons/pi";
import { RiCustomerService2Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import { LogoutCurve } from 'iconsax-react';

export type SideBarData = {
    icon: JSX.Element,
    path: string,
    title: string,
    onClick?: ()=>Promise<void>,
    negative?: boolean
}

export const SideBarArray : SideBarData[] = [
  {
    icon: <MdSpaceDashboard className=" w-[25px] h-[25px]"/> ,
    path: routes.dashboard.path,
    title: "Dashboard",
  },
  {
    icon: <FaUsers className="w-[25px] h-[25px]"/>,
    path: routes.dashboard.users.path,
    title: "Users",
  },
  {
    icon: <FaRepeat className=" w-[25px] h-[25px]"/>,
    path: routes.dashboard.transactions.path,
    title: "Transactions",
  },
  
]; 

export const useSideBarMenu = (): SideBarData[] =>{
  const basicData = Array.from(SideBarArray);
  const {admin, logout} = useAdmin();

  if(!admin) return basicData;

  if(admin.role !== 'Admin'){
      basicData.push({
      icon: <RiVerifiedBadgeFill className="w-[25px] h-[25px]"/>,
      path: routes.dashboard.kyc.path,
      title: "Kyc",
    },
    {
      icon: <PiWarningCircleFill className="w-[25px] h-[25px]"/>,
      path: routes.dashboard.reports.path,
      title: "Reports",
    },
    )
  }

  if(admin.role === 'Secretary' || admin.role === 'Super Admin'){
    basicData.push({
      icon: <TbCashBanknoteFilled className='w-[25px] h-[25px]' />,
      title: 'Charges',
      path: routes.dashboard.charges.path
    })
  }

  if(admin.role === 'Admin' || admin.role === 'Super Admin'){
    basicData.push({
      icon: <HiUserGroup className='w-[25px] h-[25px]' />,
      title: admin.role === 'Admin'? 'Your Orders' : 'Orders',
      path: routes.dashboard.orders.path
    });
  }

  if(admin.role === 'Customer Care'){
    basicData.push({
      icon: <PiWechatLogoFill className='w-[25px] h-[25px]' />,
      title:'Sessions',
      path: routes.dashboard.sessions.path
    });
  }

  if(admin.role === 'Super Admin'){
    basicData.push({
      icon: <RiCustomerService2Fill className='w-[25px] h-[25px]' />,
      title:'Admins',
      path: routes.dashboard.allAdmin.path
    });
  }

  if(admin.role === 'Super Admin' || admin.role === 'Secretary'){
    basicData.push({
      icon: <IoWallet className='w-[25px] h-[25px]' />,
      title:'Withdrawals',
      path: routes.dashboard.withdrawal.path
    },{
      icon: <GrMoney className='w-[25px] h-[25px]' />,
      title:'Bonuses',
      path: routes.dashboard.bonuses.path
    })
  }

  basicData.push({
      icon: <FaUserCircle className='w-[25px] h-[25px]' />,
      title:'Profile',
      path: routes.dashboard.profile.path
    }, {
      title: "Logout",
      icon: <LogoutCurve variant='Bold' size={'25px'} color='red' className='text-red' />,
      path:"",
      negative: true,
      onClick: logout});

  




  return basicData;
}




