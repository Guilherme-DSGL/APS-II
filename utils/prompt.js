/**
 * @typedef {import('../entities/questao.js')} Question
 */

/**
 * Classe base para os prompts.
 * @abstract
 */
class Prompt {
  promptTemplate;

  /**
   * Construtor da classe Prompt.
   * @param {string} promptTemplate - O template para o prompt.
   */
  constructor(promptTemplate) {
    if (this.constructor === Prompt) {
      throw new Error("Não se pode instanciar a classe base diretamente");
    }
    this.promptTemplate = promptTemplate;
  }

  /**
   * Método abstrato para construir o prompt.
   * @param {object} object - O objeto para preencher o template do prompt.
   * @returns {string} O prompt final.
   * @throws {Error} Caso o método não seja implementado.
   */
  buildPrompt(object) {
    throw new Error("Método 'buildPrompt' não implementado");
  }
}

class QuestionPrompt extends Prompt {
  static instance;

  constructor() {
    super(`
Contexto:
Você é um mentor em programação competitiva, especializado em orientar estudantes que participam da OBI (Olimpíada Brasileira de Informática). Seu objetivo é fornecer sugestões iniciais e estratégias gerais que ajudem o estudante a começar a resolver o problema apresentado, mas não fornecer a solução completa.

Problema:
{{question}}

Objetivo:
Ajude o estudante a dar os primeiros passos na resolução da questão, fornecendo sugestões de como pensar sobre o problema, identificar as partes importantes e estruturar uma abordagem inicial.

Instruções para Resposta:
A resposta deve conter:

1. **Compreensão do Problema:**
    - Perguntas que o estudante pode se fazer para entender melhor o problema.
    - Pontos importantes para prestar atenção na descrição.

2. **Sugestões de Abordagem:**
    - Técnicas gerais ou estruturas de dados que podem ser úteis.
    - Estratégias para simplificar ou dividir o problema em partes menores.

3. **Casos de Teste:**
    - Sugestões de exemplos simples que o estudante pode criar para verificar sua compreensão inicial do problema.

4. **Dicas para Evitar Erros Comuns:**
    - Alertas sobre possíveis armadilhas ou erros típicos em problemas semelhantes.

Exemplo de Resposta:
Para um problema sobre calcular a soma de números em um intervalo, a IA pode sugerir:

    1. Identificar o intervalo dado na entrada e verificar se ele é válido.
    2. Pensar em como iterar sobre os números do intervalo.
    3. Considerar se há padrões matemáticos que podem simplificar o cálculo.
    4. Testar com casos simples como intervalos com 1 número ou intervalos negativos.

Nota: Você deve se limitar a sugerir direções e estratégias iniciais. Não deve fornecer a solução final.

**Limite de Caracteres:** A resposta não deve ultrapassar 2000 caracteres, incluindo espaços e quebras de linha. Tenha em mente que a clareza e objetividade são essenciais para fornecer uma ajuda eficaz sem exceder esse limite.
`);
  }

  /**
   * Constrói o prompt de pergunta substituindo o marcador no template.
   * @param {Question} question - A pergunta a ser colocada no template.
   * @returns {string} O prompt com a pergunta preenchida.
   */
  buildPrompt(question) {
    return this.promptTemplate.replace("{{question}}", question.description);
  }

  /**
   * Método para obter a instância única.
   * @returns {QuestionPrompt} A instância única da classe QuestionPrompt.
   */
  static getInstance() {
    if (!QuestionPrompt.instance) {
      QuestionPrompt.instance = new QuestionPrompt();
    }
    return QuestionPrompt.instance;
  }
}

const prompts = {
  questionSuggestions: QuestionPrompt.getInstance(),
};

module.exports = { prompts, Prompt };