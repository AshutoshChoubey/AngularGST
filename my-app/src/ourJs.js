

// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/5c7e5d55a726ff2eea5aaf77/default';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();


 // var table = $('#example').DataTable( {
 //        lengthChange: false,
 //        buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
 //      } );
 
 //     table.buttons().container()
 //        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
      
  $(document).ready(function() {
//   function functionForDataTable() {

//     var table = $('#example').DataTable( {
//         lengthChange: false,
//         buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
//       } );
 
//      table.buttons().container()
//         .appendTo( '#example_wrapper .col-md-6:eq(0)' );
// };

window.functionForDataTable = function() {

    window.table = $('#example').DataTable( {
        lengthChange: false,
        buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ]
      } );
 
     table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
};
});