// Função para aplicar a máscara do CPF
import {PessoaModel} from "@/models/pessoa.model";
import {ControladorModel} from "@/models/controlador.model";

const applyCpfMask = (data: PessoaModel | ControladorModel) => {
  let cpf = data.documento.replace(/\D/g, ''); // Remove tudo que não for número
  if (cpf.length <= 3) {
    data.documento = cpf;
  } else if (cpf.length <= 6) {
    data.documento = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  } else if (cpf.length <= 9) {
    data.documento = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else {
    data.documento = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
};

// Função para aplicar a máscara do RG
const applyRgMask = (data: PessoaModel | ControladorModel) => {
  let rg = data.documento.replace(/[^a-zA-Z0-9]/g, ''); // Remove tudo que não for letra ou número

  // Limitar a entrada a 10 caracteres (2 letras + 8 números)
  if (rg.length > 10) {
    rg = rg.slice(0, 10);
  }

  // Aplicar a máscara com base na quantidade de caracteres
  if (rg.length <= 2) {
    data.documento = rg.toUpperCase();
  } else if (rg.length <= 5) {
    data.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}`;
  } else if (rg.length <= 8) {
    data.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}.${rg.slice(4, 7)}`;
  } else {
    data.documento = `${rg.slice(0, 2).toUpperCase()}-${rg.slice(2, 4)}.${rg.slice(4, 7)}.${rg.slice(7, 11)}`;
  }
};

export {applyCpfMask, applyRgMask}
