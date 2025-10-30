-- Tabela de usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('administrador', 'comum') NOT NULL DEFAULT 'comum'
);

-- Tabela de templates de processo
CREATE TABLE processo_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT,
    etapa_inicial_id INT NULL
);

-- Tabela de etapas de cada template
CREATE TABLE etapas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    template_id INT NOT NULL,
    FOREIGN KEY (template_id) REFERENCES processo_templates(id) ON DELETE CASCADE
);

-- Relaciona etapa inicial ao template
ALTER TABLE processo_templates
ADD CONSTRAINT fk_etapa_inicial
FOREIGN KEY (etapa_inicial_id) REFERENCES etapas(id) ON DELETE SET NULL;

-- Tabela de transições entre etapas
CREATE TABLE transicoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etapa_origem_id INT NOT NULL,
    etapa_destino_id INT NOT NULL,
    nome_acao VARCHAR(100) NOT NULL,
    template_id INT NOT NULL,
    FOREIGN KEY (template_id) REFERENCES processo_templates(id) ON DELETE CASCADE,
    CHECK (etapa_origem_id <> etapa_destino_id),
    FOREIGN KEY (etapa_origem_id) REFERENCES etapas(id) ON DELETE CASCADE,
    FOREIGN KEY (etapa_destino_id) REFERENCES etapas(id) ON DELETE CASCADE
);

-- Tabela de instâncias de processos
CREATE TABLE processo_instancias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    template_id INT NOT NULL,
    etapa_atual_id INT NOT NULL,
    solicitante_id INT NOT NULL,
    responsavel_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP NULL,
    status ENUM('em_andamento', 'concluido', 'cancelado') NOT NULL DEFAULT 'em_andamento',
    FOREIGN KEY (template_id) REFERENCES processo_templates(id),
    FOREIGN KEY (etapa_atual_id) REFERENCES etapas(id),
    FOREIGN KEY (solicitante_id) REFERENCES usuarios(id),
    FOREIGN KEY (responsavel_id) REFERENCES usuarios(id)
);

-- Tabela de comentários por processo
CREATE TABLE processo_comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    texto TEXT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (processo_id) REFERENCES processo_instancias(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de histórico de movimentações entre etapas
CREATE TABLE processo_historico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    processo_id INT NOT NULL,
    etapa_origem_id INT NULL,
    etapa_destino_id INT NOT NULL,
    usuario_responsavel_id INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacao TEXT,
    FOREIGN KEY (processo_id) REFERENCES processo_instancias(id) ON DELETE CASCADE,
    FOREIGN KEY (etapa_origem_id) REFERENCES etapas(id),
    FOREIGN KEY (etapa_destino_id) REFERENCES etapas(id),
    FOREIGN KEY (usuario_responsavel_id) REFERENCES usuarios(id)
);
