export default function Button({children,loading,loadingText,type="button"}){
    return(
        <button type={type} disabled={loading} className="w-full bg-black text-white p-3 rounded cursor-pointer">
          {loading?loadingText:children}
        </button>
    )
}