function setLoading(isLoading) {
    const btnSpam = document.getElementById("generate-btn");
    if (isLoading) {
        btnSpam.innerHTML = "Loading...";
    }
    else {
        btnSpam.innerHTML = "Generate Magic Background";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    
    const form = document.querySelector(".form-group");
    const textArea = document.getElementById("description");
    const htmlcode = document.getElementById("html-code");
    const csscode = document.getElementById("css-code");
    const prewiew = document.getElementById("preview-section");

    form.addEventListener("submit", async function(event){
        event.preventDefault(); // Evita o recarregamento da página

        const description = textArea.value.trim();

        if (!description) {
            return;
        }

        setLoading(true);

        try {
        
            const response = await fetch("https://eduardolukas.app.n8n.cloud/webhook/gerador-fundo", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({description})
            });
            const data = await response.json();
            const parserd = new DOMParser();

            htmlcode.textContent = data.code || "";
            csscode.textContent = data.style || "";

            prewiew.style.display = "block";
            prewiew.innerHTML = data.code || "";

            let styleTag = document.getElementById("dynamic-style");

            if (styleTag) styleTag.remove();

            if (data.style) {
                styleTag = document.createElement("style");
                styleTag.id = "dynamic-style";
                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }

        }catch (error){
            console.error("Error", error);
            htmlcode.textContent = "An error occurred. Please try again.";
            csscode.textContent = "An error occurred. Please try again.";
            preview.innerHTML = "";

        }finally {
            setLoading(false);

        }

    
    });

});


// Objetivo:
// Enviar um texto de um formulário para uma API do n8n e exibir o resultado o código html, css e colocar a animação no fundo da tela do site.

// Passos:
// 1. No JavaScript, pegar o evento de submit do formulário para evitar o recarregamento da página.
// 2. Obter o valor digitado pelo usuário no campo de texto.
// 3. Exibir um indicador de carregamento enquanto a requisição está sendo processada.
// 4. Fazer uma requisição HTTP (POST) para a API do n8n, enviando o texto do formulário no corpo da requisição em formato JSON.
// 5. Receber a resposta da API do n8n (esperando um JSON com o código HTML/CSS do background).
// 6. Se a resposta for válida, exibir o código HTML/CSS retornado na tela:
//    - Mostrar o HTML gerado em uma área de preview.
//    - Inserir o CSS retornado dinamicamente na página para aplicar o background.
// 7. Remover o indicador de carregamento após o recebimento da resposta.