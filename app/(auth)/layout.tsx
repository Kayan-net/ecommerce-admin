export default function AuthLayout ({
    children
}:{
    children:React.ReactNode
}) {
    return (
        <div className= "h-screen bg-gradient-to-br from-indigo-900 to-sky-700 text-white flex items-center justify-center px-6">
           
           
           
           
            <main className="flex items-center justify-center h-[calc(100vh-56px)]">
             {children}
             </main>
        
        
        
        </div>
    )
}