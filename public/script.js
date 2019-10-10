function fetchAllBands(done){
    $.get('/api/bands',function(data){
        done(data);
    })
}

function fetchBands(done,bands){
    done(bands);
    // $.get('/api/bands',function(data){
    //     done(data);
    // })
}

function createBand(band){
    return $(`<li>${band.name}</li>`);
}


function addBand(name,done){
    $.post('/api/bands',{
        name: name
    },function(data){
        done(data);
    })
}

$(function(){
    let bandlist = $('#band-list');
    
    let bandName = $('#bandName');

    // function loginpage(){
    //     $.get('/login',function(data){
    //         let bands = $('#body').html(data);
    //         console.log(bands);
    //         // fetchBands(function(bands){
    //         //     bandlist.empty();
    //         //     for(band of bands){
    //         //         bandlist.append(createBand(band));
    //         //     }
    //         // },bands)
    //     })
    // }

    // loginpage();

    fetchAllBands(function(bands){
        bandlist.empty();
        for(band of bands){
            bandlist.append(createBand(band));
        }
    })

    $('#btnBandAdd').click(function(){
        addBand(bandName.val(),function(addedBand){
            //window.alert("Added" + addedBand.name + "to database");
            bandlist.append(createBand(addedBand));
        })
    })

})