const texts = {
    common: {
        administrator:'Administrador',
        labName:'Nombre del laboratorio',        
        socialService: 'Servicio social',
        internship: 'Prácticas profesionales',
        accountNumber: 'Número de cuenta UAEMex',
        deletePermanently: 'Eliminar permanentemente',
        back: 'Atrás',
        dashboard: 'Panel',
        openingTime: 'Hora de apertura',
        closingTime: 'Hora de cierre',
        create: 'Crear',
        update: 'Actualizar',
        clearFilters: 'Limpiar filtros',
        cancel: 'Cancelar',
        alumn:'Alumno',
        confirmNewPassword: 'Confirmar nueva contraseña',
        confirmPassword: 'Confirmar contraseña',
        currentPassword: 'Contraseña actual',
        description: 'Descripción',
        email: 'Correo electrónico',
        enter: 'Ingresar',
        logout: 'Cerrar sesión',
        major: 'Carrera',
        maternalSurname: 'Apellido materno',
        name: 'Nombre(s)',
        newPassword: 'Nueva contraseña',
        of: 'de',
        origin: 'Origen',
        other: 'Ingresa otra carrera',
        password: 'Contraseña',
        paternalSurname: 'Apellido paterno',
        placeHolderAccountNumber: 'máximo 8 caracteres',
        placeHolderConfirmPassword: 'contraseña',
        placeHolderEmail: 'correo@ejemplo.com',
        placeHolderMaternalSurname: 'Apellido Materno',
        placeHolderName: 'Nombre(s)',
        placeHolderOrigin: 'Institución educativa, organización, etc.',
        placeHolderPassword: 'contraseña',
        placeHolderRole: 'Selecciona tu rol',
        role: 'Rol',
        editRole: 'Editar rol',
        registeredAt:'Fecha de registro',
        save: 'Guardar',
        users: 'Usuarios',
        user:'Usuario',
        saved: 'Guardado',
        send: 'Enviar',
        settings: 'Ajustes',
        termsAndConditions: 'Términos y condiciones',
        typeUser: 'Tipo de usuario',
        warning: 'Advertencia',
        laboratory: 'Laboratorio',
        continue: 'Continuar',
        goHome: 'Regresar al inicio',
        use: 'Usar',
        noResults: 'No hay resultados',
        search: 'Buscar',
        delete:'Eliminar',
        reset: 'Reiniciar',
        edit:'Editar',
        export: 'Exportar',
        type: 'Tipo',
        label: 'Etiqueta',
        status: 'Estado',
        laboratories: 'Laboratorios',
        available: 'Disponible',
        inUse: 'En uso',
        maintenance: 'Mantenimiento',
        return: 'Regresar',
        date: 'Fecha',
        startTime: 'Hora de inicio',
        today: 'Hoy',
        active: 'Activo',
        finished: 'Finalizado',
        minutes: 'minutos',
        total: 'Total',
        administration: 'Administración',

    },
    contact: {
        title: 'Contacto',
    },
    deleteAccount: {
        title: 'Eliminar cuenta',
        description: 'Esto eliminará permanentemente tu cuenta',
        advertence: 'Por favor, procede con cautela, esta acción es irreversible.',
        button: 'Eliminar cuenta',
        dialog: {
            title: '¿Estas seguro que quieres eliminar tu cuenta?',
            description:
                'Una vez borrada tu cuenta, toda la información asociada será permanentemente borrada. Por favor, ingresa tu contraseña para confirmar que quieres borrar permanentemente tu cuenta',
        },
    },
    developments: {
        title: 'Desarrollos',
    },
    users:{
        dialog:{
            role:{
                title:'Editar rol',
                description: 'Puedes editar el rol del usuario para ',
            },
            delete:{
                title:'¿Estás seguro que quieres eliminar este usuario?',
                description: 'Esto eliminará permanentemente este usuario y la información asociada a él.',
            }
        }
    },
    footer: {
        copyright: '© 2025 Todos los Derechos Reservados',
        useDisclaimer:
            'Esta página puede ser reproducida con fines no lucrativos, siempre y cuando se cite la fuente completa y su dirección electrónica, y no se mutile.',
    },
    forgotPassword: {
        title: 'Restablece tu contraseña',
        description: 'Ingresa tu correo para recibir un enlace para restablecer tu contraseña.',
        button: 'Enviar enlace de restablecimiento',
        returnLogin: 'O bien, vuelve al apartado de',
    },
    laboratory: {
        title: 'El laboratorio',
    },
    login: {
        title: 'Accede a tu cuenta',
        description: 'Utiliza tu correo y contraseña que registraste para acceder a tu cuenta.',
        forgotPassword: '¿Olvidaste tu contraseña?',
        rememberMe: 'Recordar mi contraseña',
        button: 'Iniciar sesión',
        noAccount: '¿No tienes una cuenta?',
    },
    modals: {
        otp: {
            title: 'Código de verificación',
            description: 'Ingresa el código de verificación dado por el administrador.',
        },
    },
    pagination: {
        items: 'elementos',
        page: 'Página',
        showing: 'Mostrando',
        rowsPerPage: 'Resultados por página',
        goToPreviousPage: 'Ir a la página anterior',
        goToNextPage: 'Ir a la siguiente página',
        goToFirstPage: 'Ir a la primera página',
        goToLastPage: 'Ir a la última página',
    },
    register: {
        title: 'Regístrate',
        description: 'Los datos que proporciones serán usados exclusivamente para fines de autenticación.',
        info: 'Para más información, consulta nuestros',
        placeHolderOtherMajor: 'UAEMex Nezahualcóyotl, Mecatrónica',
        button: 'Regístrate',
        alreadyHaveAccount: '¿Ya tienes una cuenta?',
    },
    resources: {
        title: 'Repositorio',
        projects: { title: 'Proyectos' },
        threeDModels: { title: 'Elementos 3D' },
        tutorials: { title: 'Tutoriales' },
    },
    services: {
        title: 'Servicios',
    },
    settings: {
        title: 'Ajustes',
        description: 'Administra tu perfil y la configuración de tu cuenta',
        appearance: {
            title: 'Apariencia',
            subtitle: 'Personaliza tu apariencia',
            description: 'Escoje tu tema preferido',
            dark: 'Oscuro',
            light: 'Claro',
            system: 'Igual que el Sistema',
        },
        password: {
            title: 'Contraseña',
            subtitle: 'Actualiza tu contraseña',
            description: 'Asegurate de que tu contraseña sea fuerte y segura',
            button: 'Cambiar contraseña',
            success: 'Contraseña cambiada con éxito',
            error: 'Ha ocurrido un error al cambiar tu contraseña',
        },
        profile: {
            title: 'Perfil',
            subtitle: 'Información de tu perfil',
            description: 'Actualiza la información de tu perfil',
        },
    },
    toast: {
        register: {
            success: 'Registrado con éxito',
        },
        loanEquipment: {
            success: 'Préstamo de equipo iniciado correctamente',
        },
        somethingWentWrong: 'Ocurrió un error inesperado, intente más tarde',
        createLab:{
            success: "Se creó el laboratorio correctamente"
        },
        editLab:{
            success:"Se actualizó el laboratorio correctamente"
        },
        deleteAllAttendance:{
            success: 'Historial de asistencias eliminado correctamente',
        }
    },
    verification: {
        linkSent: 'Un nuevo enlace de verificación ha sido enviado a tu correo electrónico',
        resend: 'Reenviar correo de verificación',
        unverified: 'No has verificado tu correo electrónico',
    },
    chooseLab: {
        title: 'Elige un laboratorio',
        description: 'Selecciona el laboratorio donde estarás trabajando',
        totalServiceHours: 'Total de horas de servicio'
    },
    chooseEquipment: {
        title: 'Elige equipo',
        description: 'Da click en el boton Usar para seleccionar el equipo que necesitas. Solo puedes elegir una computadora',
    },
    dashboard: {
        welcome: 'Bienvenido a tu panel',
        availableEquipment: 'Equipos disponibles',
        currentAttendance: 'Asistencia activa',
        attendanceStart: 'Inicio de asistencia',
        finishAttendance: 'Finalizar asistencia',
        chooseLaboratory: 'Elegir laboratorio',
        myEquipmentLoans: 'Mis préstamos',
    },
    oneTimePasswords:{
        title: 'Códigos de registro',
    },
    laboratories:{
        dialog:{
            create:{
                title:'Nuevo laboratorio',
                description: 'Tu puedes crear un nuevo laboratorio y configurar su horario',
            },
            edit:{
                title: "Editar laboratorio",
                description:'Tu puedes editar el nombre y horario del laboratorio',
            },
        },
        newLab: 'Nuevo laboratorio'
    },
};

export default texts;
