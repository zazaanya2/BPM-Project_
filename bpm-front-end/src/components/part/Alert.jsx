import React from 'react';  
import Swal from 'sweetalert2';

// Alert component accepts 'type' and 'message' props to display the alert accordingly
export default function Alert({ type, message }) {
    const showAlert = () => {
        // Define the SweetAlert options based on the 'type' prop
        Swal.fire({
            title: type === 'success' ? 'Sukses!' : 'Gagal!',
            text: message,
            icon: type,
            confirmButtonText: 'OK'
        });
    };

    // Trigger the alert when the component is rendered
    React.useEffect(() => {
        if (message) {
            showAlert();
        }
    }, [message]);

    return null;  // This component does not render any visible UI, just triggers the alert
}
