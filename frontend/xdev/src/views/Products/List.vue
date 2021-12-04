<template>
  <v-layout flex align-center justify-center fill-height>
    <v-card class="xs12 sm4 align-center justify-center">
      <v-card-title>Produto</v-card-title>

      <v-data-table
        :headers="cabecalho"
        :items="produtos"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:[`item.acoes`]="{ item }">
          <v-icon small class="mr-2" @click="editarProduto(item.id)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deletarProduto(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
import ProductService from "../../services/ProductService";

export default {
  data() {
    return {
      produtos: [],
      cabecalho: [
        { text: "Nome", align: "start", sortable: true, value: "nome" },
        { text: "Valor", sortable: true, value: "valor" },
        { text: "Ações", sortable: false, value: "acoes" },
      ],
    };
  },
  methods: {
    buscarProdutos() {
      ProductService.getAll()
        .then((response) => {
          this.produtos = response.data.map(this.fromataProduto);
        })
        .catch((e) => console.log(e));
    },
    fromataProduto(produtos) {
      return {
        //vem do backend
        id: produtos.idprodutos,
        nome: produtos.nome,
        valor: produtos.valor,
      };
    },
    deletarProduto(id) {
      ProductService.delete(id)
        .then((response) => {
          console.log(response);
          this.buscarProdutos();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editarProduto(id) {
      this.$router.push({ name:"DetailProducts", params: { id: id } });
    },
  },
  mounted() {
    this.buscarProdutos();
  },
};
</script>
