import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { Header } from "../components/Header";
import { SummaryTable } from "../components/SummaryTable";
import { Auth } from "../contexts/AuthContext";

export function Home() {
  const user = useContextSelector(Auth, (context) => {
    return context.user
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}