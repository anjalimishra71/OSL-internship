export default function Input({ type,name, placeholder ,value, onChange }) {
    return (
        <div>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}  className="w-full border p-3 rounded"/>
        </div>
    )
}
