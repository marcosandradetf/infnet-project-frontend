export default function AccountInput({type, setValue, handleKeyDown, placeholder, rounded, height, readOnly, value}) {
    return (
        <input type={type} className={`border ${height} sm:w-96 ${rounded} p-5`} placeholder={placeholder}
               onChange={(e) => setValue(e.target.value)} value={value} onKeyDown={handleKeyDown} readOnly={readOnly}/>
    );
}