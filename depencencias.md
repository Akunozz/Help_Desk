## Tabela de Endpoints e Dependências

| Endpoint                 | Método  | Descrição                      | Campos obrigatórios                                                                 | Depende de                                  |
|--------------------------|---------|--------------------------------|--------------------------------------------------------------------------------------|---------------------------------------------|
| `/usuarios`              | `POST`  | Criar usuário                  | `nome`, `email`, `senha`, `tipo_usuario`                                            | —                                           |
| `/templates`             | `POST`  | Criar template de processo     | `nome`                                                                               | —                                           |
| `/etapas`                | `POST`  | Criar etapa                    | `nome`, `template_id`                                                               | `/templates`                                |
| `/transicoes`            | `POST`  | Criar transição entre etapas   | `nome_acao`, `etapa_origem_id`, `etapa_destino_id`, `template_id`                  | `/etapas`, `/templates`                     |
| `/instancias`            | `POST`  | Criar instância de processo    | `titulo`, `template_id`, `etapa_atual_id`, `solicitante_id`                         | `/templates`, `/etapas`, `/usuarios`        |
| `/comentarios`           | `POST`  | Criar comentário               | `texto`, `processo_id`, `usuario_id`                                                | `/instancias`, `/usuarios`                  |
| `/historico`             | `POST`  | Registrar movimentação         | `processo_id`, `etapa_origem_id`, `etapa_destino_id`, `usuario_responsavel_id`     | `/instancias`, `/etapas`, `/usuarios`       |
| `/instancias/:id`        | `PUT`   | Atualizar etapa atual          | `etapa_atual_id`, `titulo`, `template_id`, `solicitante_id`, `responsavel_id`      | `/etapas`                                   |
| `/usuarios`              | `GET`   | Listar usuários                | —                                                                                    | —                                           |
| `/templates`             | `GET`   | Listar templates               | —                                                                                    | —                                           |
| `/etapas`                | `GET`   | Listar etapas                  | —                                                                                    | —                                           |
| `/transicoes`            | `GET`   | Listar transições              | —                                                                                    | —                                           |
| `/instancias`            | `GET`   | Listar instâncias              | —                                                                                    | —                                           |
| `/comentarios`           | `GET`   | Listar comentários             | —                                                                                    | —                                           |
| `/historico`             | `GET`   | Listar histórico               | —                                                                                    | —                                           |
