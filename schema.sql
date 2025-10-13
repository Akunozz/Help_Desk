-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('cliente', 'suporte') NOT NULL
);

-- Criação da tabela de tickets
CREATE TABLE tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    status ENUM('aberto', 'em_atendimento', 'aguardando_resposta', 'resolvido', 'fechado') NOT NULL DEFAULT 'aberto',
    data_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_resolucao TIMESTAMP NULL,
    data_fechamento TIMESTAMP NULL,
    cliente_id INT NOT NULL,
    agente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (agente_id) REFERENCES usuarios(id)
);

-- Criação da tabela de comentários
CREATE TABLE comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    texto TEXT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criação da tabela de histórico de status
CREATE TABLE historico_status_tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status_anterior ENUM('aberto', 'em_atendimento', 'aguardando_resposta', 'resolvido', 'fechado'),
    status_novo ENUM('aberto', 'em_atendimento', 'aguardando_resposta', 'resolvido', 'fechado') NOT NULL,
    data_mudanca TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_id INT NOT NULL,
    usuario_responsavel_id INT NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (usuario_responsavel_id) REFERENCES usuarios(id)
);