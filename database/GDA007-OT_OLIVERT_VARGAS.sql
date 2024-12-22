create database  GDA007_OT_Olivert_Vargas;
GO

use GDA007_OT_Olivert_Vargas;
go

create table Rol(
idRol int identity(1,1) not null,
nombre varchar(45) unique not null,
fechaCreacion datetime default getdate() not null

constraint PK_Rol primary key (idRol)
);

create table Estados(
idEstado int identity(1,1) not null,
nombre varchar(45) unique not null,
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime

constraint PK_Estados primary key (idEstado)
);

create table Clientes(
idCliente int identity(1,1) not null,
razonSocial varchar(245) not null,
nombreComercial varchar(34) not null,
direccionEntrega varchar(45) not null,
telefono varchar(45),
email varchar(45) unique not null,
estados_idEstados int not null,
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime,
fechaEliminacion datetime

constraint PK_Clientes primary key (idCliente)
constraint FK_Clientes_Estados foreign key (estados_idEstados) references Estados(idEstado),
);

create table Usuarios(
idUsuario int identity(1,1) not null,
rol_idRol int not null,
estados_idEstados int not null,
correoElectronico varchar(45) unique not null,
nombreCompleto varchar(45) not null,
passwrd varchar(100) not null,
direccion varchar(45) not null,
telefono varchar(45),
fechaNacimiento date not null,
Clientes_idClientes int null,
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime,
fechaEliminacion datetime

constraint PK_Usuarios primary key (idUsuario),
constraint FK_Usuarios_Rol foreign key (rol_idRol) references Rol(idRol),
constraint FK_Usuarios_Estados foreign key (estados_idEstados) references Estados(idEstado),
constraint FK_Usuarios_Clientes foreign key (Clientes_idClientes) references Clientes(idCliente) on delete set null
);

create table CategoriaProductos(
idCategoriaProducto int identity(1,1) not null,
usuario_idUsuarios int not null,
nombre varchar(45) unique not null,
estados_idEstados int not null,
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime,
fechaEliminacion datetime

constraint PK_CategoriaProductos primary key (idCategoriaProducto),
constraint FK_CategoriaProductos_Usuarios foreign key (usuario_idUsuarios) references Usuarios(idUsuario),
constraint FK_CategoriaProductos_Estados foreign key (estados_idEstados) references Estados(idEstado)
);

create table Orden(
idOrden int identity(1,1) not null,
usuarios_idUsuarios int not null,
estados_idEstados int not null,
nombreCompleto varchar(45) not null,
direccion varchar(45) not null,
telefono varchar(45) not null,
correoElectronico varchar(45) not null,
fechaEntregaEstimada date,
fechaEntregado date,
totalOrden float not null,
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime

constraint PK_Orden primary key (idOrden),
constraint FK_Orden_Usuarios foreign key (usuarios_idUsuarios) references Usuarios(idUsuario),
constraint FK_Orden_Estados foreign key (estados_idEstados) references Estados(idEstado)
);

create table Productos(
idProducto int identity(1,1) not null,
CategoriaProductos_idCategoriaProductos int not null,
usuarios_idUsuarios int not null,
nombre varchar(45) not null,
marca varchar(45) not null,
codigo varchar(45) unique not null,
cantidad int not null,
estados_idEstados int not null,
precio float not null,
fotoUrl varchar(500),
fechaCreacion datetime default getdate() not null,
fechaModificacion datetime,
fechaEliminacion datetime

constraint PK_Productos primary key (idProducto),
constraint FK_Productos_CategoriaProductos foreign key (CategoriaProductos_idCategoriaProductos) references CategoriaProductos(idCategoriaProducto),
constraint FK_Productos_Usuarios foreign key (usuarios_idUsuarios) references Usuarios(idUsuario),
constraint FK_Productos_Estados foreign key (estados_idEstados) references Estados(idEstado)
);

create table OrdenDetalles(
idOrdenDetalle int identity(1,1) not null,
Orden_idOrden int not null,
Productos_idProductos int not null,
cantidad int not null,
precio float not null,
subtotal float not null,
fechaCreacion datetime default getdate() not null

constraint PK_OrdenDetalles primary key (idOrdenDetalle),
constraint FK_OrdenDetalles_Orden foreign key (Orden_idOrden) references Orden(idOrden),
constraint FK_OrdenDetalles_Productos foreign key (Productos_idProductos) references Productos(idProducto)
);
GO

------------------- PROCEDIMIENTOS ALMACENADOS ----------------------

-----------------------------------------------------|
------------------ INSERTAR DATOS -------------------|
-----------------------------------------------------|

---Insertar Rol
CREATE PROCEDURE p_insertarRol
	@nombre varchar(45)
AS
BEGIN
	insert into Rol (nombre)
	values (@nombre);
END
GO

EXEC p_insertarRol @nombre = 'Administrador';
EXEC p_insertarRol @nombre = 'Operador';
EXEC p_insertarRol @nombre = 'Cliente';
GO

CREATE OR ALTER PROCEDURE p_insertarEstado
	@nombre varchar(45)
AS
BEGIN
	insert into Estados (nombre)
	values (@nombre);
END
GO

EXEC p_insertarEstado @nombre = 'Activo';
EXEC p_insertarEstado @nombre = 'Inactivo';
EXEC p_insertarEstado @nombre = 'Sin Stock';
EXEC p_insertarEstado @nombre = 'Confirmado';
EXEC p_insertarEstado @nombre = 'Cancelado';
EXEC p_insertarEstado @nombre = 'Enviado';
EXEC p_insertarEstado @nombre = 'Procesando';
GO

--Insertar Clientes
CREATE OR ALTER PROCEDURE p_insertarClientes
	@razonSocial varchar(245),
	@nombreComercial varchar(34),
	@direccionEntrega varchar(45),
	@telefono varchar(45),
	@email varchar(45)
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Activo'
	);

	insert into Clientes (razonSocial, nombreComercial, direccionEntrega, telefono, email, estados_idEstados)
	values (@razonSocial, @nombreComercial, @direccionEntrega, @telefono, @email, @idEstado);
END
GO

EXEC p_insertarClientes 
	@razonSocial = 'OHVC Innovation S.A.',
    @nombreComercial = 'OHVS',
    @direccionEntrega = 'Avenida Petapa zona 12',
    @telefono = '33225588',
    @email = 'ohvc1996@gmail.com';

EXEC p_insertarClientes 
	@razonSocial = 'STVN Industries S.A.',
    @nombreComercial = 'STVN',
    @direccionEntrega = 'Antigua Guatemala',
    @telefono = '33225588',
    @email = 'stvn1993@gmail.com';

EXEC p_insertarClientes 
    @razonSocial = 'Tech Solutions S.A.',
    @nombreComercial = 'TechSol',
    @direccionEntrega = 'Avenida Innovaci�n 45, Ciudad',
    @telefono = '987654321',
    @Email = 'contacto@techsol.com';

EXEC p_insertarClientes 
    @razonSocial = 'Distribuidora Global S.A.',
    @nombreComercial = 'DistribuGlobal',
    @direccionEntrega = 'Calle Comercio 789, Localidad X',
    @telefono = '123123123',
    @Email = 'ventas@distribuglobal.com';

EXEC p_insertarClientes 
    @razonSocial = 'Alimentos Frescos S.A.',
    @nombreComercial = 'AlimenFresco',
    @direccionEntrega = 'Calle de la Salud 22, Distrito Y',
    @telefono = '456789123',
    @Email = 'informes@alimentosfrescos.com';

EXEC p_insertarClientes 
    @razonSocial = 'Ropa y Moda S.A.',
    @nombreComercial = 'RopaModa',
    @direccionEntrega = 'Calle del Estilo 60, Zona Centro',
    @telefono = '321654987',
    @Email = 'soporte@ropaymoda.com';

EXEC p_insertarClientes 
    @razonSocial = 'Electro Hogar S.A.',
    @nombreComercial = 'ElectroHogar',
    @direccionEntrega = 'Avenida de los Electrodom�sticos 14, Barrio Z',
    @telefono = '789123456',
    @Email = 'atencion@electrohogar.com';
GO

EXEC p_insertarClientes 'Empresa A', 'Comercial A', 'Calle 1', '1234567890', 'contacto1@empresa.com';
EXEC p_insertarClientes 'Empresa B', 'Comercial B', 'Calle 2', '0987654321', 'contacto2@empresa.com';
EXEC p_insertarClientes 'Empresa C', 'Comercial C', 'Calle 3', '1112223333', 'contacto3@empresa.com';
EXEC p_insertarClientes 'Empresa D', 'Comercial D', 'Calle 4', '4445556666', 'contacto4@empresa.com';
EXEC p_insertarClientes 'Empresa E', 'Comercial E', 'Calle 5', '7778889999', 'contacto5@empresa.com';
EXEC p_insertarClientes 'Empresa F', 'Comercial F', 'Calle 6', '1231231234', 'contacto6@empresa.com';
EXEC p_insertarClientes 'Empresa G', 'Comercial G', 'Calle 7', '4564564567', 'contacto7@empresa.com';
EXEC p_insertarClientes 'Empresa H', 'Comercial H', 'Calle 8', '7897897890', 'contacto8@empresa.com';
EXEC p_insertarClientes 'Empresa I', 'Comercial I', 'Calle 9', '1472583690', 'contacto9@empresa.com';
EXEC p_insertarClientes 'Empresa J', 'Comercial J', 'Calle 10', '3692581470', 'contacto10@empresa.com';
GO

---Insertar Usuarios
CREATE OR ALTER PROCEDURE p_insertarUsuarios
	@rol_idRol int,
	@correoElectronico varchar(45),
	@nombreCompleto varchar(45),
	@passwrd varchar(100),
	@direccion varchar(45),
	@telefono varchar(45),
	@fechaNacimiento date,
	@Clientes_idClientes int
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Activo'
	);

	insert into Usuarios (rol_idRol,estados_idEstados,correoElectronico, 
		nombreCompleto,passwrd,direccion,telefono,fechaNacimiento, 
		Clientes_idClientes
	)
	values (@rol_idRol,@idEstado,@correoElectronico,@nombreCompleto,
		@passwrd,@direccion,@telefono,@fechaNacimiento, 
		@Clientes_idClientes
	);
END
GO

EXEC p_insertarUsuarios
    @rol_idRol = 2, 
    @correoElectronico = 'Prueba3@empresa.com',
    @nombreCompleto = 'Prueba3 prueba3',
    @passwrd = 'prueba123',
	@direccion = 'avenida 1',
    @telefono = '123456789',
    @fechaNacimiento = '1985-06-15',
    @Clientes_idClientes = NULL;
GO

EXEC p_insertarUsuarios
    @rol_idRol = 1, 
    @correoElectronico = 'admin1@empresa.com',
    @nombreCompleto = 'Juan Perez',
    @passwrd = '$2b$10$AJ7W76S6RrLSjxX8jEGmvOc1F7ZEzKzGRcvSyn.hvXXkakgWStQ7G',
	@direccion = 'avenida 2',
    @telefono = '123456789',
    @fechaNacimiento = '1985-06-15',
    @Clientes_idClientes = NULL;

EXEC p_insertarUsuarios
    @rol_idRol = 2, 
    @correoElectronico = 'operador1@empresa.com',
    @nombreCompleto = 'Mar�a G�mez',
    @passwrd = 'operador456',
	@direccion = 'direccion 1 avenida 2',
    @telefono = '987654321',
    @fechaNacimiento = '1990-08-25',
    @Clientes_idClientes = 1; 

EXEC p_insertarUsuarios
    @rol_idRol = 3, 
    @correoElectronico = 'cliente1@empresa.com',
    @nombreCompleto = 'Carlos M�ndez',
    @passwrd = 'cliente789',
	@direccion = 'direccion 2 avenida 3',
    @telefono = '321654987',
    @fechaNacimiento = '2000-02-10',
    @Clientes_idClientes = 2; 

EXEC p_insertarUsuarios
    @rol_idRol = 3, 
    @correoElectronico = 'cliente2@empresa.com',
    @nombreCompleto = 'Laura Ruiz',
    @passwrd = 'pass2024',
	@direccion = 'direccion 5 avenida 1',
    @telefono = '456123789',
    @fechaNacimiento = '1995-03-30',
    @Clientes_idClientes = 3;

EXEC p_insertarUsuarios
    @rol_idRol = 2, 
    @correoElectronico = 'operador2@empresa.com',
    @nombreCompleto = 'Andrea Soto',
    @passwrd = 'op789',
	@direccion = 'ciudad real avenida 3',
    @telefono = '789654123',
    @fechaNacimiento = '1992-11-18',
    @Clientes_idClientes = 4; 

EXEC p_insertarUsuarios
    @rol_idRol = 2, 
    @correoElectronico = 'operador3@empresa.com',
    @nombreCompleto = 'Sara Lop�z',
    @passwrd = 'op790',
	@direccion = 'direccion 11 avenida 22',
    @telefono = '54788965',
    @fechaNacimiento = '1992-11-18',
    @Clientes_idClientes = 5; 
GO

EXEC p_insertarUsuarios 1,'user1@correo.com', 'Usuario Uno', 'pass1', 'direccion 11 avenida 22','1234567890', '1985-01-01', 6;
EXEC p_insertarUsuarios 2,'user2@correo.com', 'Usuario Dos', 'pass2', 'direccion 12 avenida 29','0987654321', '1990-02-02', 7;
EXEC p_insertarUsuarios 3,'user3@correo.com', 'Usuario Tres', 'pass3', 'direccion 13 avenida 28','1112223333', '1995-03-03', 8;
EXEC p_insertarUsuarios 1,'user4@correo.com', 'Usuario Cuatro', 'pass4','direccion 14 avenida 27', '4445556666', '1980-04-04', 9;
EXEC p_insertarUsuarios 2,'user5@correo.com', 'Usuario Cinco', 'pass5','direccion 15 avenida 26', '7778889999', '1975-05-05', 10;
EXEC p_insertarUsuarios 3,'user6@correo.com', 'Usuario Seis', 'pass6','direccion 16 avenida 25', '1231231234', '2000-06-06', 11;
EXEC p_insertarUsuarios 1,'user7@correo.com', 'Usuario Siete', 'pass7','direccion 17 avenida 24', '4564564567', '1998-07-07', 12;
EXEC p_insertarUsuarios 2,'user8@correo.com', 'Usuario Ocho', 'pass8','direccion 18 avenida 23', '7897897890', '1993-08-08', 13;
EXEC p_insertarUsuarios 3,'user9@correo.com', 'Usuario Nueve', 'pass9','direccion 19 avenida 22', '1472583690', '1988-09-09', 14;
EXEC p_insertarUsuarios 1,'user10@correo.com', 'Usuario Diez', 'pass10','direccion 11 avenida 21', '3692581470', '1991-10-10', 15;
GO

---Insertar Categoria Productos
CREATE OR ALTER PROCEDURE p_insertarCategoriaProductos
	@usuario_idUsuarios INT,
    @nombre VARCHAR(45)
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Activo'
	);
	insert into CategoriaProductos (usuario_idUsuarios, nombre, estados_idEstados)
	values (@usuario_idUsuarios, @nombre, @idEstado);
END
GO

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 1, 
    @nombre = 'Electrodom�sticos'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 2, 
    @nombre = 'Ropa y Accesorios'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 3,
    @nombre = 'Alimentos Frescos'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 4,
    @nombre = 'Tecnolog�a';

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 1,
    @nombre = 'Juguetes y Juegos'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 2,
    @nombre = 'Muebles y Decoraci�n'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 3, 
    @nombre = 'Hogar y Jard�n'; 

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 4, 
    @nombre = 'Deportes';

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 5, 
    @nombre = 'Libros y Revistas';

EXEC p_insertarCategoriaProductos
    @usuario_idUsuarios = 1, 
    @nombre = 'Mascotas';
GO

---Insertar Orden
CREATE PROCEDURE p_insertarOrden
    @usuarios_idUsuarios INT,
    @estados_idEstados INT,
    @nombreCompleto VARCHAR(45),
    @direccion VARCHAR(45),
    @telefono VARCHAR(45),
    @correoElectronico VARCHAR(45),
    @fechaEntregaEstimada DATE,
    @fechaEntregado DATE NULL,
    @totalOrden FLOAT
AS
BEGIN
    insert into Orden (usuarios_idUsuarios, estados_idEstados, nombreCompleto,
    direccion, telefono, correoElectronico, fechaEntregaEstimada, fechaEntregado,
    totalOrden)
    values (@usuarios_idUsuarios, @estados_idEstados, @nombreCompleto, @direccion,
    @telefono, @correoElectronico, @fechaEntregaEstimada, @fechaEntregado,
    @totalOrden);
END
GO

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 1,
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Juan P�rez',
--    @direccion = 'Calle Principal 123',
--    @telefono = '3001234567',
--    @correoElectronico = 'juan.perez@example.com',
--    @fechaEntregaEstimada = '2024-12-10',
--    @fechaEntregado = NULL,
--    @totalOrden = 150.75;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 2,
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Mar�a G�mez',
--    @direccion = 'Avenida Central 45',
--    @telefono = '3109876543',
--    @correoElectronico = 'maria.gomez@example.com',
--    @fechaEntregaEstimada = '2024-12-12',
--    @fechaEntregado = NULL,
--    @totalOrden = 200.00;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 3, 
--    @estados_idEstados = 3, 
--    @nombreCompleto = 'Carlos Mart�nez',
--    @direccion = 'Calle Comercio 789',
--    @telefono = '3201122334',
--    @correoElectronico = 'carlos.martinez@example.com',
--    @fechaEntregaEstimada = '2024-12-15',
--    @fechaEntregado = NULL,
--    @totalOrden = 75.50;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 4, 
--    @estados_idEstados = 2, 
--    @nombreCompleto = 'Laura Hern�ndez',
--    @direccion = 'Pasaje Los Almendros 32',
--    @telefono = '3052233445',
--    @correoElectronico = 'laura.hernandez@example.com',
--    @fechaEntregaEstimada = '2024-12-18',
--    @fechaEntregado = NULL,
--    @totalOrden = 300.25;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 16, 
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Sara Lop�z',
--    @direccion = 'Avenida las Americas 32',
--    @telefono = '54788965',
--    @correoElectronico = 'sara.lopez33@example.com',
--    @fechaEntregaEstimada = '2024-12-18',
--    @fechaEntregado = NULL,
--    @totalOrden = 550.35;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 6, 
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Sara Lop�z',
--    @direccion = 'Avenida las Americas 32',
--    @telefono = '54788965',
--    @correoElectronico = 'sara.lopez33@example.com',
--    @fechaEntregaEstimada = '2024-12-18',
--    @fechaEntregado = NULL,
--    @totalOrden = 300.00;


--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 7, 
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Sara Lop�z',
--    @direccion = 'Avenida las Americas 32',
--    @telefono = '54788965',
--    @correoElectronico = 'sara.lopez33@example.com',
--    @fechaEntregaEstimada = '2024-12-18',
--    @fechaEntregado = NULL,
--    @totalOrden = 430.00;

--EXEC p_insertarOrden 
--    @usuarios_idUsuarios = 6, 
--    @estados_idEstados = 1, 
--    @nombreCompleto = 'Sara Lop�z',
--    @direccion = 'Avenida las Americas 32',
--    @telefono = '54788965',
--    @correoElectronico = 'sara.lopez33@example.com',
--    @fechaEntregaEstimada = '2024-12-18',
--    @fechaEntregado = NULL,
--    @totalOrden = 250.00;
--GO

--EXEC p_insertarOrden 1, 1, 'Usuario Uno', 'Calle 1', '1234567890', 'user1@correo.com', '2024-12-15', NULL, 1500.00;
--EXEC p_insertarOrden 2, 2, 'Usuario Dos', 'Calle 2', '0987654321', 'user2@correo.com', '2024-12-16', NULL, 2000.00;
--EXEC p_insertarOrden 3, 3, 'Usuario Tres', 'Calle 3', '1112223333', 'user3@correo.com', '2024-12-17', NULL, 1800.00;
--EXEC p_insertarOrden 4, 4, 'Usuario Cuatro', 'Calle 4', '4445556666', 'user4@correo.com', '2024-12-19', NULL, 2500.00;
--EXEC p_insertarOrden 5, 1, 'Usuario Cinco', 'Calle 5', '7778889999', 'user5@correo.com', '2024-12-20', NULL, 3000.00;
--EXEC p_insertarOrden 16, 2, 'Usuario Seis', 'Calle 6', '1231231234', 'user6@correo.com', '2024-12-22', NULL, 500.00;
--EXEC p_insertarOrden 7, 3, 'Usuario Siete', 'Calle 7', '4564564567', 'user7@correo.com', '2024-12-23', NULL, 1200.00;
--EXEC p_insertarOrden 8, 4, 'Usuario Ocho', 'Calle 8', '7897897890', 'user8@correo.com', '2024-12-24', NULL, 800.00;
--EXEC p_insertarOrden 10, 1, 'Usuario Nueve', 'Calle 9', '1472583690', 'user9@correo.com', '2024-12-25', NULL, 950.00;
--EXEC p_insertarOrden 10, 2, 'Usuario Diez', 'Calle 10', '3692581470', 'user10@correo.com', '2024-12-26', NULL, 400.00;
--EXEC p_insertarOrden 14, 1, 'Usuario Prueba1', 'Calle 111', '12344311', 'userPrueba9@correo.com', '2024-12-25', NULL, 550.00;
--EXEC p_insertarOrden 14, 2, 'Usuario Prueba2', 'Calle 112', '22334455', 'user10Prueba2@correo.com', '2024-12-26', NULL, 600.00;
--GO

---Insertar Productos
CREATE OR ALTER PROCEDURE p_insertarProductos
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idUsuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @cantidad INT,
    @precio FLOAT,
    @fotoUrl VARCHAR(500) NULL
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Activo'
	);
    insert into Productos (CategoriaProductos_idCategoriaProductos, usuarios_idUsuarios,
    nombre, marca, codigo, cantidad, estados_idEstados, precio, fotoUrl)
    values (@CategoriaProductos_idCategoriaProductos, @usuarios_idUsuarios,
    @nombre, @marca, @codigo, @cantidad, @idEstado, @precio, @fotoUrl);
END
GO

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 1, 
    @usuarios_idUsuarios = 1, 
    @nombre = 'Smartphone X100',
    @marca = 'TechBrand',
    @codigo = 'X100001',
    @cantidad = 50,
    @precio = 599.99,
    @fotoUrl = 'http://example.com/smartphone_x100.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 1, 
    @usuarios_idUsuarios = 2, 
    @nombre = 'Laptop Pro 15',
    @marca = 'TechBrand',
    @codigo = 'P015001',
    @cantidad = 30,
    @precio = 1200.00,
    @fotoUrl = 'http://example.com/laptop_pro_15.jpg';

EXEC p_insertarProductos
    @CategoriaProductos_idCategoriaProductos = 2, 
    @usuarios_idUsuarios = 3,
    @nombre = 'Camiseta Estilo X',
    @marca = 'ModaR�pida',
    @codigo = 'MRC1001',
    @cantidad = 100, 
    @precio = 19.99,
    @fotoUrl = 'http://example.com/camiseta_estilo_x.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 2, 
    @usuarios_idUsuarios = 4, 
    @nombre = 'Pantal�n Azul Cl�sico',
    @marca = 'ModaR�pida',
    @codigo = 'MRC1002',
    @cantidad = 80,
    @precio = 29.99,
    @fotoUrl = 'http://example.com/pantalon_azul_clasico.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 3, 
    @usuarios_idUsuarios = 5, 
    @nombre = 'Cereal Integral',
    @marca = 'Saludable',
    @codigo = 'CS001',
    @cantidad = 150, 
    @precio = 4.99,
    @fotoUrl = 'http://example.com/cereal_integral.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 3, 
    @usuarios_idUsuarios = 1, 
    @nombre = 'Leche de Almendra',
    @marca = 'AlmondBest',
    @codigo = 'LA002',
    @cantidad = 120,
    @precio = 2.49,
    @fotoUrl = 'http://example.com/leche_almendra.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 4, 
    @usuarios_idUsuarios = 2, 
    @nombre = 'Silla Ejecutiva',
    @marca = 'MueblesPro',
    @codigo = 'ME001',
    @cantidad = 40,
    @precio = 99.99,
    @fotoUrl = 'http://example.com/silla_ejecutiva.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 4, 
    @usuarios_idUsuarios = 3, 
    @nombre = 'Mesa de Comedor',
    @marca = 'MueblesPro',
    @codigo = 'MC002',
    @cantidad = 20, 
    @precio = 249.99,
    @fotoUrl = 'http://example.com/mesa_comedor.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 5, 
    @usuarios_idUsuarios = 4, 
    @nombre = 'Mu�eca Bella',
    @marca = 'JuguetesMagia',
    @codigo = 'JM001',
    @cantidad = 150,
    @precio = 15.99,
    @fotoUrl = 'http://example.com/muneca_bella.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 5, 
    @usuarios_idUsuarios = 5, 
    @nombre = 'Peluche Animal',
    @marca = 'JuguetesMagia',
    @codigo = 'PA002',
    @cantidad = 180,
    @precio = 12.99,
    @fotoUrl = 'http://example.com/peluche_animal.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 6, 
    @usuarios_idUsuarios = 1, 
    @nombre = 'Auriculares Bluetooth',
    @marca = 'TechSound',
    @codigo = 'TS001',
    @cantidad = 70,
    @precio = 89.99,
    @fotoUrl = 'http://example.com/auriculares_bluetooth.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 6, 
    @usuarios_idUsuarios = 2, 
    @nombre = 'Cargador R�pido',
    @marca = 'PowerTech',
    @codigo = 'PT001',
    @cantidad = 200,
    @precio = 19.99,
    @fotoUrl = 'http://example.com/cargador_rapido.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 7,
    @usuarios_idUsuarios = 3, 
    @nombre = 'Bal�n de F�tbol',
    @marca = 'DeporteMax',
    @codigo = 'DF001',
    @cantidad = 60, 
    @precio = 29.99,
    @fotoUrl = 'http://example.com/balon_futbol.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 7,
    @usuarios_idUsuarios = 4, 
    @nombre = 'Raqueta de Tenis',
    @marca = 'DeporteMax',
    @codigo = 'DT002',
    @cantidad = 40, 
    @precio = 49.99,
    @fotoUrl = 'http://example.com/raqueta_tenis.jpg';

EXEC p_insertarProductos 
    @CategoriaProductos_idCategoriaProductos = 8,
    @usuarios_idUsuarios = 5, -- Usuario Diferente
    @nombre = 'Libro de Ciencia',
    @marca = 'EditorialABC',
    @codigo = 'LC001',
    @cantidad = 100,
    @precio = 19.99,
    @fotoUrl = 'http://example.com/libro_ciencia.jpg';
GO

EXEC p_insertarProductos 3, 5, 'Producto A', 'Marca A', 'COD123', 100, 25.50, 'https://example.com/productoa.jpg';
EXEC p_insertarProductos 1, 10, 'Producto B', 'Marca B', 'COD456', 50, 15.75, 'https://example.com/productob.jpg';
EXEC p_insertarProductos 8, 2, 'Producto C', 'Marca C', 'COD789', 200, 35.00, 'https://example.com/productoc.jpg';
EXEC p_insertarProductos 6, 12, 'Producto D', 'Marca D', 'COD101', 120, 40.25, 'https://example.com/productod.jpg';
EXEC p_insertarProductos 4, 9, 'Producto E', 'Marca E', 'COD202', 75, 12.90, 'https://example.com/productoe.jpg';
EXEC p_insertarProductos 2, 16, 'Producto F', 'Marca F', 'COD303', 300, 9.99, NULL;
EXEC p_insertarProductos 5, 7, 'Producto G', 'Marca G', 'COD404', 80, 60.00, 'https://example.com/productog.jpg';
EXEC p_insertarProductos 7, 11, 'Producto H', 'Marca H', 'COD505', 150, 45.70, 'https://example.com/productoh.jpg';
EXEC p_insertarProductos 3, 14, 'Producto I', 'Marca I', 'COD606', 90, 20.30, NULL;
EXEC p_insertarProductos 8, 6, 'Producto J', 'Marca J', 'COD707', 110, 75.80, 'https://example.com/productoj.jpg';
GO

---Insertar Orden Detalles
CREATE PROCEDURE p_insertarOrdenDetalles
    @Orden_idOrden INT,
    @Productos_idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    insert into OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad,
    precio, subtotal)
    values (@Orden_idOrden, @Productos_idProductos, @cantidad, @precio,
    @subtotal);
END
GO

--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1,@Productos_idProductos = 1,@cantidad = 2,@precio = 599.99,@subtotal = 1199.98;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2,@Productos_idProductos = 3,@cantidad = 3,@precio = 19.99,@subtotal = 59.97; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3,@Productos_idProductos = 4,@cantidad = 1,@precio = 29.99,@subtotal = 29.99; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4,@Productos_idProductos = 6,@cantidad = 1,@precio = 1200.00,@subtotal = 1200.00; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1,@Productos_idProductos = 7,@cantidad = 1,@precio = 99.99,@subtotal = 99.99; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2,@Productos_idProductos = 8,@cantidad = 5,@precio = 2.49,@subtotal = 12.45; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3,@Productos_idProductos = 9,@cantidad = 4,@precio = 4.99,@subtotal = 19.96; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4,@Productos_idProductos = 10,@cantidad = 2,@precio = 49.99,@subtotal = 99.98; 
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1,@Productos_idProductos = 11,@cantidad = 3,@precio = 29.99,@subtotal = 89.97;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2,@Productos_idProductos = 12,@cantidad = 5,@precio = 15.99,@subtotal = 79.95;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 1, @cantidad = 2, @precio = 10.50, @subtotal = 21.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 3, @cantidad = 1, @precio = 15.00, @subtotal = 15.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 2, @cantidad = 4, @precio = 8.75, @subtotal = 35.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 5, @cantidad = 3, @precio = 12.30, @subtotal = 36.90;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 7, @cantidad = 6, @precio = 9.10, @subtotal = 54.60;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 4, @cantidad = 2, @precio = 20.00, @subtotal = 40.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 6, @cantidad = 5, @precio = 7.25, @subtotal = 36.25;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 9, @cantidad = 1, @precio = 30.00, @subtotal = 30.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 8, @cantidad = 3, @precio = 18.50, @subtotal = 55.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 10, @cantidad = 4, @precio = 5.75, @subtotal = 23.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 11, @cantidad = 2, @precio = 25.00, @subtotal = 50.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 12, @cantidad = 3, @precio = 14.20, @subtotal = 42.60;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 13, @cantidad = 1, @precio = 50.00, @subtotal = 50.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 14, @cantidad = 6, @precio = 6.50, @subtotal = 39.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 15, @cantidad = 5, @precio = 9.80, @subtotal = 49.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 1, @cantidad = 2, @precio = 11.00, @subtotal = 22.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 2, @cantidad = 4, @precio = 10.00, @subtotal = 40.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 3, @cantidad = 3, @precio = 15.50, @subtotal = 46.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 4, @cantidad = 1, @precio = 20.75, @subtotal = 20.75;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 5, @cantidad = 6, @precio = 8.90, @subtotal = 53.40;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 6, @cantidad = 5, @precio = 7.50, @subtotal = 37.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 7, @cantidad = 3, @precio = 12.00, @subtotal = 36.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 8, @cantidad = 4, @precio = 9.75, @subtotal = 39.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 9, @cantidad = 2, @precio = 16.50, @subtotal = 33.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 10, @cantidad = 6, @precio = 5.50, @subtotal = 33.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 11, @cantidad = 3, @precio = 22.50, @subtotal = 67.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 12, @cantidad = 1, @precio = 30.00, @subtotal = 30.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 13, @cantidad = 2, @precio = 40.00, @subtotal = 80.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 14, @cantidad = 5, @precio = 6.00, @subtotal = 30.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 15, @cantidad = 3, @precio = 9.00, @subtotal = 27.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 1, @cantidad = 4, @precio = 12.00, @subtotal = 48.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 2, @cantidad = 6, @precio = 7.50, @subtotal = 45.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 3, @cantidad = 5, @precio = 8.25, @subtotal = 41.25;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 4, @cantidad = 3, @precio = 10.50, @subtotal = 31.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 5, @cantidad = 1, @precio = 15.00, @subtotal = 15.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 6, @cantidad = 2, @precio = 20.00, @subtotal = 40.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 7, @cantidad = 4, @precio = 9.50, @subtotal = 38.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 8, @cantidad = 6, @precio = 7.00, @subtotal = 42.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 9, @cantidad = 5, @precio = 11.25, @subtotal = 56.25;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 10, @cantidad = 3, @precio = 13.00, @subtotal = 39.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 1, @Productos_idProductos = 11, @cantidad = 4, @precio = 14.50, @subtotal = 58.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 2, @Productos_idProductos = 12, @cantidad = 2, @precio = 18.00, @subtotal = 36.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 3, @Productos_idProductos = 13, @cantidad = 5, @precio = 10.25, @subtotal = 51.25;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 4, @Productos_idProductos = 14, @cantidad = 3, @precio = 12.50, @subtotal = 37.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 5, @Productos_idProductos = 15, @cantidad = 1, @precio = 25.00, @subtotal = 25.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 6, @Productos_idProductos = 1, @cantidad = 6, @precio = 8.75, @subtotal = 52.50;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 7, @Productos_idProductos = 2, @cantidad = 4, @precio = 9.00, @subtotal = 36.00;
--EXEC p_insertarOrdenDetalles @Orden_idOrden = 8, @Productos_idProductos = 3, @cantidad = 2, @precio = 20.00, @subtotal = 40.00;
--GO

-----------------------------------------------------|
---------------- ACTUALIZAR DATOS  ------------------|
-----------------------------------------------------|

--- Modificar Clientes
CREATE PROCEDURE p_editarClientes
	@idCliente int,
	@razonSocial varchar(245),
	@nombreComercial varchar(34),
	@direccionEntrega varchar(45),
	@telefono varchar(45),
	@email varchar(45),
	@estados_idEstados int	
AS
BEGIN
	UPDATE Clientes SET razonSocial = @razonSocial, nombreComercial = @nombreComercial,
	direccionEntrega = @direccionEntrega, telefono = @telefono, email = @email, 
	estados_idEstados = @estados_idEstados, fechaModificacion = GETDATE() 
	WHERE idCliente = @idCliente;
END
GO 


EXEC p_editarClientes
	@idCliente = 3,
    @razonSocial = 'Distribuidora Global S.A.',
    @nombreComercial = 'DistribuGlobal',
    @direccionEntrega = 'Calle Comercio 789, Localidad X',
    @telefono = '11111111',
    @Email = 'ventas11@distribuglobal.com',
	@estados_idEstados = 1;
GO

CREATE OR ALTER PROCEDURE p_editarEstados
	@idEstado INT,
	@nombre VARCHAR(45)
AS
BEGIN
	UPDATE Estados SET nombre = @nombre, fechaModificacion = GETDATE()
	WHERE idEstado = @idEstado;
END
GO


-- Modificar Usuarios
CREATE OR ALTER PROCEDURE p_editarUsuarios
	@idUsuario int,
	@rol_idRol int,
	@estados_idEstados int,
	@correoElectronico varchar(45),
	@nombreCompleto varchar(45),
	@passwrd varchar(100),
	@direccion varchar(45),
	@telefono varchar(45),
	@fechaNacimiento date,
	@Clientes_idClientes int
AS
BEGIN
	UPDATE Usuarios SET rol_idRol = @rol_idRol, estados_idEstados = @estados_idEstados, 
	correoElectronico = @correoElectronico, nombreCompleto = @nombreCompleto, 
	passwrd = @passwrd, direccion = @direccion, telefono = @telefono, fechaNacimiento = @fechaNacimiento,
	Clientes_idClientes = @Clientes_idClientes, fechaModificacion = GETDATE()
	WHERE idUsuario = @idUsuario;
END
GO


-- Modificar Categoria Productos
CREATE PROCEDURE p_editarCategoriaProductos
	@idCategoriaProducto int,
	@usuario_idUsuarios int,
	@nombre varchar(45),
	@estados_idEstados int
AS
BEGIN
	UPDATE CategoriaProductos SET usuario_idUsuarios = @usuario_idUsuarios, nombre = @nombre, 
	estados_idEstados = @estados_idEstados, fechaModificacion = GETDATE()
	WHERE idCategoriaProducto = @idCategoriaProducto;

END
GO

EXEC p_editarCategoriaProductos
	@idCategoriaProducto = 10,
	@usuario_idUsuarios = 5,
	@nombre = 'Mascotas',
	@estados_idEstados = 3;
GO


-- Modificar Orden
CREATE OR ALTER PROCEDURE p_editarOrden
	@idOrden int,
	--@usuarios_idUsuarios int,
	@estados_idEstados int,
	@nombreCompleto varchar(45),
	@direccion varchar(45),
	@telefono varchar(45),
	@correoElectronico varchar(45),
	@fechaEntregaEstimada date,
	@fechaEntregado date
	--@totalOrden float
AS
BEGIN
	UPDATE Orden SET estados_idEstados = @estados_idEstados,
	nombreCompleto = @nombreCompleto, direccion = @direccion, telefono = @telefono,
	correoElectronico = @correoElectronico, fechaEntregaEstimada = @fechaEntregaEstimada,
	fechaEntregado = @fechaEntregado, fechaModificacion = GETDATE()
	WHERE idOrden = @idOrden;
END
GO

EXEC p_editarOrden
    @idOrden = 1,
	--@usuarios_idUsuarios = 1,
	@estados_idEstados = 1,
	@nombreCompleto = 'Juan P�rez',
	@direccion = 'Calle Principal 123',
	@telefono = '3001234567',
	@correoElectronico = 'juan.perez@example.com',
	@fechaEntregaEstimada = '2024-12-10',
	@fechaEntregado = '2024-12-22'
	--@totalOrden = 150.75
;
GO
--modificacion de la fecha de creacion para el reporte que solicita
--total de quetzales en el mes de Agosto
UPDATE Orden SET fechaCreacion = '2024-08-10' WHERE idOrden = 2;
UPDATE Orden SET fechaCreacion = '2024-08-15' WHERE idOrden = 9;
UPDATE Orden SET fechaCreacion = '2024-08-20' WHERE idOrden = 17;
GO


-- Modificar Productos
CREATE PROCEDURE p_editarProductos
	@idProducto int,
	@CategoriaProductos_idCategoriaProductos int,
	@usuarios_idUsuarios int,
	@nombre varchar(45),
	@marca varchar(45),
	@codigo varchar(45),
	@cantidad int,
	@estados_idEstados int,
	@precio float ,
	@fotoUrl varchar(500)
AS
BEGIN
	UPDATE Productos SET CategoriaProductos_idCategoriaProductos = @CategoriaProductos_idCategoriaProductos,
	usuarios_idUsuarios = @usuarios_idUsuarios, nombre = @nombre, marca = @marca, codigo = @codigo,
	cantidad = @cantidad, estados_idEstados = @estados_idEstados, precio = @precio, fotoUrl = @fotoUrl,
	fechaModificacion = GETDATE()
	WHERE idProducto = @idProducto;
END
GO

EXEC p_editarProductos
	@idProducto = 10,
	@CategoriaProductos_idCategoriaProductos = 5,
	@usuarios_idUsuarios = 5,
	@nombre = 'Peluche Animal',
	@marca = 'JuguetesMagia',
	@codigo = 'PA002666',
	@cantidad = 180,
	@estados_idEstados = 1,
	@precio = 12.99,
	@fotoUrl = 'http://example.com/peluche_animal.jpg';
GO
--select * from Productos;


-----------------------------------------------------|
----------------- ELIMINAR DATOS --------------------|
-----------------------------------------------------|

--El ESTADO ELIMINADO ES EL 4

--Eliminar Clientes
CREATE PROCEDURE p_eliminarClientes
	@idCliente int
AS
BEGIN
	UPDATE Clientes SET estados_idEstados = 4, fechaEliminacion = getdate()
	WHERE idCliente = @idCliente;
END
GO

EXEC p_EliminarClientes	@idCliente = 3;
GO
--select * from Clientes;

--Eliminar Usuarios
CREATE OR ALTER PROCEDURE p_eliminarUsuarios
	@idUsuario int
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Inactivo'
	);
	UPDATE Usuarios SET estados_idEstados = @idEstado, fechaEliminacion = getdate()
	WHERE idUsuario = @idUsuario;
END
GO

--EXEC p_eliminarUsuarios @idUsuario = 4;
--GO
--select * from Usuarios;

--Eliminar CategoriaP Productos
CREATE OR ALTER PROCEDURE p_eliminarCategoriaProductos
	@idCategoriaProducto int
AS
BEGIN
	DECLARE @idEstado INT =(
		SELECT idEstado
		FROM Estados
		WHERE nombre = 'Inactivo'
	);
	UPDATE CategoriaProductos SET estados_idEstados = @idEstado, fechaEliminacion = getdate()
	WHERE idCategoriaProducto = @idCategoriaProducto;
END
GO

EXEC p_eliminarCategoriaProductos @idCategoriaProducto = 7;
GO
--SELECT * FROM CategoriaProductos;

--Eliminar Productos
CREATE PROCEDURE p_eliminarProductos
	@idProducto int
AS
BEGIN
	UPDATE Productos SET estados_idEstados = 4, fechaEliminacion = GETDATE()
	WHERE idProducto = @idProducto;
END
GO

EXEC p_eliminarProductos @idProducto = 5;
GO
--SELECT * FROM Productos;


-------------------------------------------------------|
--------------------- CONSULTAS -----------------------|
-------------------------------------------------------|


--a. Total de Productos activos que tengaen stock mayor a 0 
CREATE VIEW ProductosActivos
AS
	SELECT COUNT(*) AS TotalProductosActivosConStock
	FROM Productos
	WHERE estados_idEstados = 1 AND cantidad > 0;
GO

--SELECT * FROM ProductosActivos;
--GO


--b. Total de Quetzales en ordenes ingresadas en el mes de Agosto 2024
CREATE VIEW TotalQuetzalesAgosto
AS
	SELECT SUM(totalOrden) AS TotalQuetzalesAgosto
	FROM  Orden
	WHERE YEAR(fechaCreacion) = 2024 AND MONTH(fechaCreacion) = 8;
GO

--SELECT * FROM TotalQuetzalesAgosto;
--GO


--c. Top 10 de clientes con Mayor consumo de ordenes de todo el hist�rico
CREATE VIEW topClientesPorConsumo
AS
	SELECT TOP 10 
		c.idCliente AS Id_Clientes,
		c.razonSocial AS Razon_Social,
		c.nombreComercial AS Nombre_Comercial,
		SUM(o.totalOrden) AS Total_De_Consumo
	FROM Clientes c
	INNER JOIN Usuarios u ON c.idCliente = u.Clientes_idClientes
	INNER JOIN Orden o ON u.idUsuario = o.usuarios_idUsuarios
	GROUP BY c.idCliente, c.razonSocial, c.nombreComercial
	ORDER BY Total_De_Consumo DESC;
GO

--SELECT * FROM topClientesPorConsumo;
--GO


--d. Top 10 de productos m�s vendidos en orden ascendente
CREATE VIEW topProductosMasVendidos
AS
	SELECT TOP 10
		p.idProducto AS Id_Producto,
		p.nombre AS Nombre_Producto,
		p.marca AS Marca_Producto,
		SUM(ord.cantidad) AS CantidadVendida
	FROM Productos p
	RIGHT JOIN OrdenDetalles ord ON p.idProducto = ord.Productos_idProductos
	GROUP BY p.idProducto, p.nombre, p.marca
	ORDER BY CantidadVendida ASC;
GO

--SELECT * FROM topProductosMasVendidos;
--GO

----------------------------------------------------CAMBIOS---------------------------------------------------

--Obtener listado de productos
CREATE OR ALTER PROCEDURE p_obtenerProductos
AS
BEGIN
    SELECT 
        idProducto, 
        CategoriaProductos_idCategoriaProductos, 
        usuarios_idUsuarios, 
        nombre, 
        marca, 
        codigo, 
        cantidad, 
        estados_idEstados, 
        precio, 
        fotoUrl,
        fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Productos
	ORDER BY fechaCreacion ASC;
END
GO

--obtener productos pro id
CREATE OR ALTER PROCEDURE p_ObtenerProductoPorId
    @idProducto INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        idProducto,
        CategoriaProductos_idCategoriaProductos,
        usuarios_idUsuarios,
        nombre,
        marca,
        codigo,
        cantidad,
        estados_idEstados,
        precio,
        fotoUrl,
        fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Productos
    WHERE 
        idProducto = @idProducto;
END
GO
--EXEC p_ObtenerProductoPorId @idProducto = 1;

CREATE OR ALTER PROCEDURE p_obtenerCategoriaProductos
AS
BEGIN
    SELECT 
        idCategoriaProducto, 
        usuario_idUsuarios, 
        nombre, 
        estados_idEstados, 
        fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        CategoriaProductos
	ORDER BY fechaCreacion ASC;
END
GO

--EXEC p_obtenerCategoriaProductos;
--go

CREATE OR ALTER PROCEDURE p_obtenerCategoriaPorId
	@idCategoriaProducto INT
AS
BEGIN
    SELECT 
        idCategoriaProducto, 
        usuario_idUsuarios, 
        nombre, 
        estados_idEstados, 
        fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        CategoriaProductos
	WHERE
		idCategoriaProducto = @idCategoriaProducto;
END
GO

--EXEC p_obtenerCategoriaPorId @idCategoriaProducto = 1;

CREATE OR ALTER PROCEDURE p_obtenerEstados
AS
BEGIN
    SELECT 
		idEstado,
        nombre, 
        fechaCreacion,
		fechaModificacion
    FROM 
        Estados
	ORDER BY fechaCreacion ASC;
END
GO

--EXEC p_obtenerEstados;

CREATE OR ALTER PROCEDURE p_obtenerEstadosPorId
	@idEstado INT
AS
BEGIN
	SET NOCOUNT ON;
    SELECT 
		idEstado,
        nombre, 
        fechaCreacion,
		fechaModificacion
    FROM 
        Estados
	WHERE
		idEstado = @idEstado;	
END
GO

--EXEC p_obtenerEstadosPorId @idEstado = 1;

CREATE OR ALTER PROCEDURE p_CrearOrdenConDetalle
    @usuarios_idUsuarios INT,
    @detalles NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY

		DECLARE @idOrden INT;
		DECLARE @totalOrden INT = 0;

        INSERT INTO Orden (
            usuarios_idUsuarios,
            estados_idEstados,
            nombreCompleto,
            direccion,
            telefono,
            correoElectronico,
			totalOrden
        )

		SELECT TOP 1
            u.idUsuario AS usuarios_idUsuarios,
            (
                SELECT idEstado
                FROM Estados
                WHERE nombre = 'Confirmado'
            ),
			u.nombreCompleto,
            u.direccion,
            u.telefono,
            u.correoElectronico,
			@totalOrden AS totalOrden
        FROM Usuarios AS u
        WHERE u.idUsuario = @usuarios_idUsuarios;

		SET @idOrden = SCOPE_IDENTITY();

		INSERT INTO OrdenDetalles (
            Orden_idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        )
		SELECT
            @idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        FROM OPENJSON(@detalles)
        WITH (
			idProducto INT,
            Productos_idProductos INT,
            cantidad INT,
            precio FLOAT,
            subtotal FLOAT
        );

		UPDATE Orden
		SET totalOrden =(
			SELECT SUM(subtotal)
            FROM OrdenDetalles
            WHERE Orden_idOrden = @idOrden
		)
		WHERE idOrden = @idOrden;

		COMMIT;
	END TRY
	BEGIN CATCH
		ROLLBACK;
		THROW;
	END CATCH;
END
GO

--Para llenar con datos la orden/detalles y hacer pruebas
DECLARE @contador INT = 1;
WHILE @contador <= 5
BEGIN
    -- Generar un usuario aleatorio entre 1 y 16
    DECLARE @usuarios_idUsuarios INT = FLOOR(RAND() * 16 + 1);
    -- Generar un JSON con detalles aleatorios de productos
    DECLARE @detalles NVARCHAR(MAX);

    SET @detalles = N'[' +
    STUFF(
        (
            SELECT ',' +
                   '{' +
                   '"Productos_idProductos": ' + CAST(FLOOR(RAND() * 25 + 1) AS NVARCHAR) + ',' +
                   '"cantidad": ' + CAST(FLOOR(RAND() * 5 + 1) AS NVARCHAR) + ',' +
                   '"precio": ' + CAST(CAST(RAND() * 100 + 1 AS DECIMAL(10, 2)) AS NVARCHAR) + ',' +
                   '"subtotal": ' + CAST(CAST((RAND() * 100 + 1) * FLOOR(RAND() * 5 + 1) AS DECIMAL(10, 2)) AS NVARCHAR) +
                   '}'
        FROM (SELECT TOP (5) 1 AS x FROM sys.all_objects) AS RandomRows
        FOR XML PATH(''), TYPE
    ).value('.', 'NVARCHAR(MAX)'), 1, 1, '') + ']';

    -- Ejecutar el procedimiento almacenado
    EXEC p_CrearOrdenConDetalle
        @usuarios_idUsuarios = @usuarios_idUsuarios,
        @detalles = @detalles;

    -- Incrementar el contador
    SET @contador = @contador + 1;
END;
GO

CREATE OR ALTER PROCEDURE p_obtenerOrdenes
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        idOrden,
        usuarios_idUsuarios,
        estados_idEstados,
        nombreCompleto,
        direccion,
        telefono,
        correoElectronico,
        fechaEntregaEstimada,
        fechaEntregado,
        totalOrden,
        fechaCreacion,
        fechaModificacion
    FROM Orden;
END
GO

CREATE OR ALTER PROCEDURE p_obtenerUsuarios
AS
BEGIN
    SELECT 
		idUsuario,
		rol_idRol,
		estados_idEstados,
		correoElectronico,
		nombreCompleto,
		direccion,
		telefono,
		fechaNacimiento,
		Clientes_idClientes,
		fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Usuarios
	ORDER BY fechaCreacion ASC;
END
GO

CREATE OR ALTER PROCEDURE p_obtenerUsuarioPorId
	@idUsuario INT
AS
BEGIN
    SELECT 
		idUsuario,
		rol_idRol,
		estados_idEstados,
		correoElectronico,
		nombreCompleto,
		direccion,
		telefono,
		fechaNacimiento,
		Clientes_idClientes,
		fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Usuarios
	WHERE
		idUsuario = @idUsuario
END
GO

CREATE OR ALTER PROCEDURE p_obtenerUsuarioPorCorreoElectronico
    @correoElectronico NVARCHAR(45)
AS
BEGIN
    SELECT 
        idUsuario,
        rol_idRol,
        estados_idEstados,
        correoElectronico,
        nombreCompleto,
        passwrd,
        direccion,
        telefono,
        fechaNacimiento,
        Clientes_idClientes,
        fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Usuarios
    WHERE
        correoElectronico = @correoElectronico
END
GO


CREATE OR ALTER PROCEDURE p_obtenerClientes
AS
BEGIN
    SELECT 
		idCliente,
		razonSocial,
		nombreComercial,
		direccionEntrega,
		telefono,
		email,
		estados_idEstados,
		fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Clientes
	ORDER BY fechaCreacion ASC;
END
GO

CREATE OR ALTER PROCEDURE p_obtenerClientePorId
	@idCliente INT
AS
BEGIN
	SET NOCOUNT ON;
    SELECT 
		idCliente,
		razonSocial,
		nombreComercial,
		direccionEntrega,
		telefono,
		email,
		estados_idEstados,
		fechaCreacion,
        fechaModificacion,
        fechaEliminacion
    FROM 
        Clientes
	WHERE
		idCliente = @idCliente
END
GO






