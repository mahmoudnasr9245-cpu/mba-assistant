import {Session} from '@supabase/supabase-js';import React,{createContext,useContext,useEffect,useState}from'react';import {supabase}from'@/lib/supabase';
type Role='learner'|'admin';type Auth={session:Session|null;role:Role|null;loading:boolean;signOut:()=>Promise<void>};
const C=createContext<Auth>({session:null,role:null,loading:true,signOut:async()=>{}});
export function AuthProvider({children}:{children:React.ReactNode}){const[session,setSession]=useState<Session|null>(null);const[role,setRole]=useState<Role|null>(null);const[loading,setLoading]=useState(true);
useEffect(()=>{supabase.auth.getSession().then(({data})=>load(data.session));const{data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>load(s));return()=>subscription.unsubscribe()},[]);
async function load(s:Session|null){setSession(s);if(!s){setRole(null);setLoading(false);return}const{data}=await supabase.from('profiles').select('role').eq('id',s.user.id).single();setRole((data?.role??'learner')as Role);setLoading(false)}
return <C.Provider value={{session,role,loading,signOut:async()=>{await supabase.auth.signOut()}}}>{children}</C.Provider>};export const useAuth=()=>useContext(C);