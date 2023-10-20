create database pdv;

create table usuarios (
    id SERIAL primary key,
    nome VARCHAR(100) not null,
    email VARCHAR(100) unique not null,
    senha char(60) not null
);

create table categorias (
    id serial primary key,
    descricao text not null
);

insert into categorias (descricao) values
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

create table produtos (
    id serial primary key,
    descricao varchar(100) not null,
    quantidade_estoque integer not null,
    valor integer not null,
    categoria_id integer not null references categorias(id)
);


create table clientes (
    id serial primary key,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    cpf char(11) unique not null,
    cep char(8) not null,
    rua varchar(100) not null,
    numero varchar(1000)not null,
    bairro varchar(100) not null,
    cidade varchar(100) not null,
    estado varchar(100) not null
);

ALTER TABLE clientes
ADD COLUMN id_usuario INT; 


ALTER TABLE clientes
ADD CONSTRAINT fk_cliente_id_usuario
FOREIGN KEY (id_usuario) REFERENCES usuarios(id);

ALTER TABLE clientes
ALTER COLUMN rua SET DEFAULT 'N/A';
ALTER TABLE clientes
ALTER COLUMN numero SET DEFAULT 'N/A';
ALTER TABLE clientes
ALTER COLUMN bairro SET DEFAULT 'N/A';
ALTER TABLE clientes
ALTER COLUMN cidade SET DEFAULT 'N/A';
ALTER TABLE clientes
ALTER COLUMN estado SET DEFAULT 'N/A';
ALTER TABLE clientes
ALTER COLUMN cep SET DEFAULT 'N/A';

create table pedidos (
  id serial primary key,
  cliente_id integer not null references clientes(id),
  observacao text default('N/A'),
  valor_total integer not null
);

create table pedido_produtos( 
  id serial primary key,
  pedido_id integer not null references pedidos(id),
  produto_id integer not null references produtos(id),
  quantidade_produto integer not null,
  valor_produto integer not null
);

ALTER TABLE produtos
ADD COLUMN produto_imagem text default('N/A');



