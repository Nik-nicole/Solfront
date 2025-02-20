import React from "react";

const Feature = () => {
    return (
        <>
            <section className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-16 ">
                <div className="max-w-7xl w-full mb-10050">
                    <h1 className="text-white text-5xl md:text-6xl font-bold text-center mb-16">
                        Characteristics
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Contenedor del video de YouTube */}
                        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/X471QY9n7dA?autoplay=1&loop=1&mute=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="space-y-8">
                            <p className="text-white text-xl md:text-2xl leading-relaxed">
                                SigNa es un intérprete inteligente que traduce señas en tiempo real,
                                facilitando la comunicación entre personas Sordas y Oyentes. Su
                                tecnología combina Machine Learning y Deep Learning.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-white text-5xl md:text-6xl font-bold text-center">
                            Herramientas usadas
                        </h2>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feature;
