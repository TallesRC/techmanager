-- =====================================================
-- 🔥 TECHMANAGER - BANCO COMPLETO SaaS MULTIEMPRESA
-- =====================================================

DROP DATABASE IF EXISTS techmanager;

CREATE DATABASE techmanager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE techmanager;

-- =====================================================
-- ORDEM CORRETA DE DROP (FKs)
-- =====================================================

DROP TABLE IF EXISTS pagamentos;
DROP TABLE IF EXISTS itens_ordem;
DROP TABLE IF EXISTS ordens;
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS equipamentos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS empresas;

-- =====================================================
-- EMPRESAS
-- =====================================================

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(20),
    plano VARCHAR(50) DEFAULT 'basic',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- USUARIOS
-- =====================================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE
);

-- =====================================================
-- CLIENTES
-- (ATUALIZADA CORRETAMENTE COM empresa_id)
-- =====================================================

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    cpf_cnpj VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(150),
    endereco TEXT,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE
);

-- =====================================================
-- EQUIPAMENTOS
-- =====================================================

CREATE TABLE equipamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    cliente_id INT NOT NULL,
    tipo VARCHAR(100),
    marca VARCHAR(100),
    modelo VARCHAR(100),
    serial VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE,

    FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE CASCADE
);

-- =====================================================
-- ESTOQUE
-- =====================================================

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    quantidade INT DEFAULT 0,
    custo DECIMAL(10,2),
    preco DECIMAL(10,2),
    estoque_minimo INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE
);

-- =====================================================
-- ORDENS DE SERVIÇO
-- =====================================================

CREATE TABLE ordens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    numero VARCHAR(50),
    cliente_id INT NOT NULL,
    equipamento_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'aberto',
    defeito TEXT,
    solucao TEXT,
    data_entrada DATE,
    data_entrega DATE,
    valor_servico DECIMAL(10,2),
    desconto DECIMAL(10,2) DEFAULT 0,
    valor_total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
        REFERENCES empresas(id)
        ON DELETE CASCADE,

    FOREIGN KEY (cliente_id)
        REFERENCES clientes(id),

    FOREIGN KEY (equipamento_id)
        REFERENCES equipamentos(id)
);

-- =====================================================
-- ITENS DA ORDEM
-- =====================================================

CREATE TABLE itens_ordem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ordem_id INT NOT NULL,
    estoque_id INT NOT NULL,
    quantidade INT NOT NULL,
    valor_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ordem_id)
        REFERENCES ordens(id)
        ON DELETE CASCADE,

    FOREIGN KEY (estoque_id)
        REFERENCES estoque(id)
);

-- =====================================================
-- PAGAMENTOS
-- =====================================================

CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ordem_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_pagamento DATE,
    parcela INT,
    total_parcelas INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ordem_id)
        REFERENCES ordens(id)
        ON DELETE CASCADE
);