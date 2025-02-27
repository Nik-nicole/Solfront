import React from "react"

export const Modal = ({ onCloseError, error }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p className="text-red-500">{error}</p>
                <button
                    onClick={onCloseError}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}


