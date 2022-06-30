
const FormAlert = ({alert}) => {
    return (
        <div className={`${alert.error ? 'bg-red-500 text-white' : 'bg-lime-200 text-lime-800'} bg-gradient-to-r text-center p-3 rounded-md uppercase  font-bold text-sm mt-7 `}>
            {alert.msg}
        </div>
    )
}

export default FormAlert