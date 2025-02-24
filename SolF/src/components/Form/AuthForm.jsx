import Button from "./Button";
import Input from "./Inputs";

const AuthForm = ({
    title,
    subtitle,
    inputs,
    buttonText,
    linkText,
    linkHref,
    linkImg,
    onSubmit
}) => {
    return (
        <div className="flex min-h-screen">
            {/* Logo y título */}
            <div>
                <div className="absolute flex items-center top-5 left-5">
                    <img src="/src/assets/hands.png" alt="Logo" className="opacity-75 object-cover w-20 h-20 rounded-full mr-2" />
                    <a href="/" className="text-xl font-medium">Sol</a>
                </div>
            </div>

            {/* Contenedor del formulario */}
            <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-[#F0F0F0]">
                <div className="max-w-sm mx-auto w-full space-y-6">
                    {/* Título y subtítulo */}
                    <div>
                        <h1 className="text-2xl font-semibold mb-1">{title}</h1>
                        <p className="text-gray-500">{subtitle}</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto space-y-6">
                      

                        {/* Inputs */}
                        {inputs.map((input, index) => (
                            <div key={index}>
                                <label className="text-gray-600 text-sm">{input.placeholder}</label>
                                <Input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    className="w-full p-3 border-b-1 focus:outline-none focus:border-emerald-400"
                                />
                            </div>
                        ))}

                        {/* Botón de acción */}
                        <Button
                            text={buttonText}
                            className="w-full bg-emerald-400 hover:bg-emerald-500 text-white py-2 rounded-md transition-colors"
                        />                    
                    </form>

                    {/* Enlace de registro/login */}
                    <p className="text-center text-sm text-gray-500">
                        {linkText && (
                            <>
                                {linkText.split("?")[0]}
                                <a href={linkHref} className="text-black hover:underline underline-offset-4">
                                    {linkText.split("?")[1]}
                                </a>
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Imagen de fondo */}
            <div className="hidden lg:block lg:w-[60%] bg-[#F0F0F0] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={linkImg}
                        alt="Imagen de fondo"
                        className="relative w-[60%] h-[100%] object-cover -rotate-90 rounded-tr-[100px] rounded-bl-[100px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
