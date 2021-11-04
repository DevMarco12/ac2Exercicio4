
// Sumário: Instância do método getCurso
getCurso();

// Sumário: Função serve para condicionar caso o curso seja novo, adiciona-lo ao form, caso não seja utilizar o post para edita-lo
$("#btnSalvar").click(function () {
    if ($("#id").val() != '')
        putCurso($("#id").val(), $("#frmCurso").serialize());
    else
        postCurso();
});

// Sumário: Função serve para dar ao btnEditar a propriedade de editar um método específico com o método getCursoPeloIndetificador
$("body").on("click", ".btnEditar", function () {
    getCursoPeloIdentificador($(this).data("id"));
});

// Sumário: Função serve para dar ao btnExcluir a propriedade do método delCurso utilizando o parâmetro do "id"
$("body").on("click", ".btnExcluir", function () {
    delCurso($(this).data("id"));
});

// Sumário: Função serve para condicionar o h5 do modal para cada caso (Adicionar/Editar)
$("#addCurso").on('show.bs.modal', function (e) {
    if ($("#id").val() == '')
        $("#tituloModal").html('Adicionar Curso');
    else
        $("#tituloModal").html('Editar Curso');
});

// Sumário: Função serve para chamar o método limparFormCurso
$("#addCurso").on('hidden.bs.modal', function (e) {
    limparFormCurso();
});

// Sumário: Função serve para pegar os atributos do curso na tabela
function getCurso() {
    $.get("https://61563f79e039a0001725a95e.mockapi.io/api/v1/cursos", function (data) {
        $("#tabCurso").html('');
        $(data).each(function (i, e) {
            $("#tabCurso").append("<tr><td>" + e.id + "</td><td>" + e.nome + "</td><td>" + e.descricao + "</td><td>" + e.qtdHoras + "</td><td>" + 
            e.urlCursos + "</td><td>" + "<button class='btn btn-primary btnEditar' data-id='" + e.id + "'><i class='bi bi-pencil-square'></i> Editar</button> "
                + "<button class='btn btn-danger btnExcluir' data-id='" + e.id + "'><i class='bi bi-trash'></i> Excluir</button>"
                + "</td></tr>");
        });
    });
}

// Sumário: Função serve para pegar um curso específico pelo identificador
function getCursoPeloIdentificador(id) {
    $.get("https://61563f79e039a0001725a95e.mockapi.io/api/v1/cursos/" + id, function (data) {
        $("#id").val(data.id);
        $("#nome").val(data.nome);
        $("#descricao").val(data.descricao);
        $("#qtdHoras").val(data.qtdHoras);
        $("#urlCursos").val(data.urlCursos);

        $("#addCurso").modal('show');
    });
}

// Sumário: Função serve para modificar um curso já cadastrado
function postCurso() {
    $.post("https://61563f79e039a0001725a95e.mockapi.io/api/v1/cursos", $("#frmCurso").serialize(),
        function (data) {
            $("#addCurso").modal('toggle');
            $.toast({ text: "Salvo com sucesso!", bgColor: 'green', position: "top-right" });
            getCurso();
        });
}

// Sumário: Função serve para deletar algum curso da tabela
function delCurso(id) {
    $.ajax({
        url: "https://61563f79e039a0001725a95e.mockapi.io/api/v1/cursos/" + id,
        method: "DELETE",
        success: function () {
            $.toast({ text: "Excluído com sucesso!", bgColor: 'green', position: "top-right" });
            getCurso();
        },
        error: function (error) {
            $.toast({ text: "Erro ao excluir: " + error, bgColor: "red", position: "top-right" });
        }
    });
}

// Sumário: Função serve para adicionar o curso á tabela
function putCurso(id, form) {
    $.ajax({
        url: "https://61563f79e039a0001725a95e.mockapi.io/api/v1/cursos/" + id,
        method: "PUT",
        data: form,
        success: function () {
            $("#addCurso").modal('toggle');
            $.toast({ text: "Salvo com sucesso!", bgColor: 'green', position: "top-right" });
            getCurso();
        },
        error: function (error) {
            $.toast({ text: "Erro ao excluir: " + error, bgColor: "red", position: "top-right" });
        }
    });
}

// Sumário: Função serve para limpar os campos do form de cadastro de curso
function limparFormCurso() {
    $("#id").val('');
    $("#nome").val('');
    $("#descricao").val('');
    $("#qtdHoras").val('');
    $("#urlCursos").val('');
}