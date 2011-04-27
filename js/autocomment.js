Drupal.behaviors.autocomment = function () {
    $("ul.autocomment-tree a.remove").unbind('click');
    $("ul.autocomment-tree a.remove").click(function (){
        block = $(this).parent('div').parent('li');
        $(block).fadeOut('fast',function() { $(this).remove();});

    });

    $("a.create-tree").click(function () {
        wrapper = $(this).parent('div');
        $.ajax({
           type: 'GET',
           url: '/js/autocomment/tree',
           dataType: "json",
           beforeSend: function (date) {$(wrapper).html('Пожалуйста, подождите загрузки...');},
           success: function (data) {
                if (data.status=='success') {
                    $(wrapper).html(data.html);
                    Drupal.behaviors.autocomment();
                }
           }
        });

    });

    $("a#add-top-comment").unbind('click');
    $("a#add-top-comment").click(function () {

        $.ajax({
           type: 'GET',
           url: '/js/autocomment/comment/0',
           dataType: "json",
           success: function (data) {
                if (data.status=='success') {
                    $("ul.autocomment-tree").append('<li>'+data.html+'</li>');
                    Drupal.behaviors.autocomment();
                }
           }
        });


    });

    $("ul.autocomment-tree a.add").unbind('click');
    $("ul.autocomment-tree a.add").click(function (){
        block   = $(this).parent('div').parent('li');
        depth   = $(block).find('input[name="ac_depth[]"]').val();
        new_depth = parseInt(depth)+1;

        $.ajax({
           type: 'GET',
           url: '/js/autocomment/comment/'+new_depth,
           dataType: "json",
           success: function (data) {
                if (data.status=='success') {
                    l = $(block).find('ul').length;
                    if (l>0) {
                        $(block).find('ul').append('<li>'+data.html+'</li>');
                    } else {
                        $(block).append('<ul><li>'+data.html+'</li></ul>');
                    }
                    Drupal.behaviors.autocomment();
                }
           }
        });


    });

}