'use client';

import { getAllUsers, getOneUser, getReportedUsers, getUserReferralHistory, getWalletHistory } from "@/services/rest-api/user-api";
import { ApiResponse } from "@/utils/interfaces/api-resonse";
import { user } from "@/utils/interfaces/user";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

type UsersAPI = {
    users: user[],
    reportedUsers: user[],
    refetch: ()=>Promise<void>
}

const UsersContext = createContext<UsersAPI | null>(null);

export const useUsers = ()=>{
    const context = useContext(UsersContext);

    if(!context) throw new Error('`useUsers` must be used within `UsersProvider`')

    return context;
}

export async function convertApiMethod<T>(method: Promise<AxiosResponse<ApiResponse<T>, unknown>>) : Promise<T> {
    const result = await method;

    return result.data.data;

}

export const useUser = (userId: string)=>{
    const queryClient = useQueryClient();
    const queries = useQueries({
        queries:[
            {
                queryKey: ['users', userId],
                queryFn: ()=>convertApiMethod(getOneUser(userId, true)),
                throwOnError: true,
                notifyOnChangeProps: ['data', 'dataUpdatedAt'],
                refetchInterval: 3.1 * 1000

            },
            {
                queryKey: ['wallet', userId],
                queryFn: ()=>convertApiMethod(getWalletHistory(userId, true)),
                notifyOnChangeProps: ['data', 'dataUpdatedAt'],
                refetchInterval: 3.1 * 1000

            },
            {
                queryKey: ['referrals', userId],
                queryFn: ()=>convertApiMethod(getUserReferralHistory(userId, true)),
                notifyOnChangeProps: ['data', 'dataUpdatedAt'],
                refetchInterval: 3.1 * 1000

            },
        ]
    });
    const refresh = useCallback(async()=>{
        await queryClient.refetchQueries({queryKey:[['wallet', userId], ['referrals', userId], ['users', userId]]})
    }, [userId, queryClient])

    const [userQuery, walletQuery, referralQuery] = queries;

    return {user:userQuery.data, wallet:walletQuery.data, referrals:referralQuery.data, refresh};

}

export default function UsersProvider({children}:{children?: ReactNode}){
    const [users, setUsersRaw] = useState<user[]>([])
    const [reportedUsers, setReportedUsersRaw] = useState<user[]>([]);
    const queryClient = useQueryClient();

    const refetch = useCallback(async()=>{
        await queryClient.refetchQueries({queryKey:['users','reportedUsers']})
    },[queryClient])

    const fetchAllUsers = useCallback(async()=>{
        const res = await getAllUsers(true)

        return res.data.data;
    },[])

    const fetchReportedUsers = useCallback(async()=>{
        const res = await getReportedUsers(true)

        return res.data.data ?? [];
    },[])

    const queries = useQueries({
        queries:[
            {
                queryKey:['users'],
                queryFn:fetchAllUsers,
                notifyOnChangeProps: ['data', 'dataUpdatedAt'],
                refetchInterval: 3.1 * 1000
            },
            {
                queryKey:['reportedUsers'],
                queryFn:fetchReportedUsers,
                notifyOnChangeProps: ['data', 'dataUpdatedAt'],
                refetchInterval: 3.1 * 1000
            },

        ]
    });

    const [usersQuery, reportedUsersQuery] = queries;

    const dataChanged = useCallback(()=>{
        return JSON.stringify(users) !== JSON.stringify(usersQuery.data) || JSON.stringify(reportedUsers) !== JSON.stringify(reportedUsersQuery.data);
    }, [reportedUsers, usersQuery.data, reportedUsersQuery.data, users])

    const setUsers = useCallback((_users : [user[], user[] ])=>{
        setUsersRaw((prev) => _users[0] ?? prev);
        setReportedUsersRaw((prev) => _users[1] ?? prev);
    },[])

    useEffect(()=>{
        if(!dataChanged()) return;

        setUsers([usersQuery.data!, reportedUsersQuery.data!])
    },[dataChanged, reportedUsersQuery.data, setUsers, usersQuery.data])

    

    




    return (
        <UsersContext.Provider value={{users, reportedUsers, refetch}}>
            {children}
        </UsersContext.Provider>
    )
}