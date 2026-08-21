$(document).ready(function () {

  // Evento ao clicar em qualquer card com atributo data-id
  $(document).on('click', '[data-id]', function (e) {
    e.preventDefault();
    const projetoId = $(this).attr('data-id');

    // Ler dados do arquivo JSON
    $.getJSON('./projetos.json', function (dados) {
      const projeto = dados[projetoId];

      if (!projeto) return;

      // Preenchimento dos dados textuais
      $('#modal-subtitulo-header').text(projeto.subtitulo);
      $('#modal-titulo').text(projeto.titulo);
      $('#modal-descricao').text(projeto.descricao);

      // Links Sociais  
      projeto.links?.github ? $('#modal-link-github').attr('href', projeto.links.github).show() : $('#modal-link-github').hide();
      projeto.links?.youtube ? $('#modal-link-youtube').attr('href', projeto.links.youtube).show() : $('#modal-link-youtube').hide();
      projeto.links?.deploy ? $('#modal-link-deploy').attr('href', projeto.links.deploy).show() : $('#modal-link-deploy').hide();
            
      // Galeria de Thumbnails & Imagem Principal
      const $galeria = $('#modal-galeria').empty();
      const $imgPrincipal = $('#modal-img-principal');

      if (projeto.galeria && projeto.galeria.length > 0) {
        $imgPrincipal.attr('src', projeto.galeria[0]);
      } else {
        $imgPrincipal.attr('src', projeto.imagemPrincipal);
      }

      projeto.galeria.forEach((imgUrl, index) => {
        const $tbBtn = $(`
          <button class="tb-item border ${index === 0 ? 'border-rose-400' : 'border-gray-200'} rounded-xl p-1 hover:border-rose-400 transition shrink-0">
            <img src="${imgUrl}" class="w-16 h-12 object-cover rounded-lg" />
          </button>
        `);

        $tbBtn.on('click', function () {
          $imgPrincipal.attr('src', imgUrl);
          $('.tb-item').removeClass('border-rose-400').addClass('border-gray-200');
          $(this).removeClass('border-gray-200').addClass('border-rose-400');
        });

        $galeria.append($tbBtn);
      });

      // Seção Contexto
      $('#modal-contexto-sub').text(projeto.contexto.subtitulo);
      $('#modal-contexto-p1').text(projeto.contexto.p1);
      $('#modal-contexto-p2').text(projeto.contexto.p2);

      // Seção User Flow
      $('#modal-userflow-sub').text(projeto.userFlow.subtitulo);
      $('#modal-userflow-img').attr('src', projeto.userFlow.imagem);

      // Seção User Story
      $('#modal-userstory-sub').text(projeto.userStory.subtitulo);
      $('#modal-userstory-desc').text(projeto.userStory.descricao);
      
      const $topicos = $('#modal-userstory-topicos').empty();
      projeto.userStory.topicos.forEach((topico) => {
        $topicos.append(`
          <li class="flex items-center gap-2 text-lg text-gray-700 font-medium">
            <span class="w-2 h-2 rounded-full bg-purple-400"></span>
            ${topico}
          </li>
        `);
      });

      // Seção Desenvolvimento
      $('#modal-desenvolvimento').text(projeto.desenvolvimento);

   if (!projeto.estilo) {
      $('#estilo').hide();
    } else {
      $('#estilo').show();

      // Fonte
      $('#modal-estilo-fonte').text(projeto.estilo.fonte);

      // Cores
      const $coresContainer = $('#modal-estilo-cores').empty();

      projeto.estilo.cores.forEach((cor) => {
        $coresContainer.append(`
          <div class="flex flex-col items-start gap-1">
            <div
              class="w-16 h-8 rounded-md ${
                cor.borda ? 'border border-gray-200' : ''
              }"
              style="background-color: ${cor.hex};">
            </div>

            <span class="text-base font-semibold text-gray-600">
              ${cor.hex}
            </span>
          </div>
        `);
      });
    }

      // Exibir Modal com Transição Slide-Up
      const $modal = $('#project-modal');
      const $panel = $modal.find('> div');

      $('body').addClass('overflow-hidden');
      $modal.removeClass('hidden');

      // Animação de entrada (Fade In no fundo + Slide Up no painel)
      setTimeout(() => {
        $modal.removeClass('opacity-0').addClass('opacity-100');
        $panel.removeClass('translate-y-full').addClass('translate-y-0');
      }, 10);
    });
  });

  // Função para fechar o Modal (Slide-Down)
  function fecharModal() {
    const $modal = $('#project-modal');
    const $panel = $modal.find('> div');

    // Animação de saída
    $modal.removeClass('opacity-100').addClass('opacity-0');
    $panel.removeClass('translate-y-0').addClass('translate-y-full');

    // Aguarda a transição de 300ms antes de ocultar
    setTimeout(() => {
      $modal.addClass('hidden');
      $('body').removeClass('overflow-hidden');
    }, 300);
  }

  // Eventos de Fechamento
  $('#close-modal').on('click', fecharModal);

  $('#project-modal').on('click', function (e) {
    if ($(e.target).is('#project-modal')) {
      fecharModal();
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharModal();
    }
  });

});