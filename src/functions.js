function start(){
  var x1 = 5 ; var y1 = 4 ;
  var x2 = 2 ; var y2 = 5 ;
  var x3 = 3 ; var y3 = 6 ;
  var params = circle_from_points(x1, y1, x2, y2, x3, y3) ;
  var cx    = params[0] ;
  var cy    = params[1] ;
  var rho   = params[2] ;
  var m12   = params[3] ;
  var m23   = params[4] ;
  var theta = params[5] ;
  function y12_from_x12(x_12){ return (y1+y2)/2 - m12*(x_12 - (x1+x2)/2) ; }
  function y23_from_x23(x_23){ return (y2+y3)/2 - m23*(x_23 - (x2+x3)/2) ; }
  
  var padding_factor = 1.2 ;
  var x_min = cx - rho*padding_factor ;
  var x_max = cx + rho*padding_factor ;
  var y_min = cy - rho*padding_factor ;
  var y_max = cy + rho*padding_factor ;
  
  var canvas  = document.getElementById('circle_canvas') ;
  var context = canvas.getContext('2d') ;
  
  var cw = canvas.width ;
  var ch = canvas.width ;
  context.fillStyle = 'rgb(255,255,255)' ;
  context.fillRect(0,0,cw,ch) ;
  
  function u_from_x(x){ return cw*(x-x_min)/(x_max-x_min) ; }
  function v_from_y(y){ return ch*(y-y_min)/(y_max-y_min) ; }
  var r = Math.sqrt( Math.pow(u_from_x(cx)-u_from_x(x1), 2) + Math.pow(v_from_y(cy)-v_from_y(y1), 2) ) ;
  
  context.arc( u_from_x(cx), v_from_y(cy) , r, 0, Math.PI*2, true) ;
  context.stroke() ;
  
  context.fillStyle = 'rgb(255,0,0)' ;
  context.beginPath() ; context.arc( u_from_x(x1), v_from_y(y1) , 10, 0, Math.PI*2, true) ; context.fill() ;
  context.beginPath() ; context.arc( u_from_x(x2), v_from_y(y2) , 10, 0, Math.PI*2, true) ; context.fill() ;
  context.beginPath() ; context.arc( u_from_x(x3), v_from_y(y3) , 10, 0, Math.PI*2, true) ; context.fill() ;
  
  context.strokeStyle = 'rgb(0,0,255)' ;
  context.beginPath() ;
  
  var x12a = x_min ; var y12a = y12_from_x12(x12a) ;
  var x12b = x_max ; var y12b = y12_from_x12(x12b) ;
  var x23a = x_min ; var y23a = y23_from_x23(x23a) ;
  var x23b = x_max ; var y23b = y23_from_x23(x23b) ;
  
  var x12a_out = x12a*Math.cos(-theta) + y12a*Math.sin(-theta) ;
  var y12a_out = y12a*Math.cos(-theta) - x12a*Math.sin(-theta) ;
  var x12b_out = x12b*Math.cos(-theta) + y12b*Math.sin(-theta) ;
  var y12b_out = y12b*Math.cos(-theta) - x12b*Math.sin(-theta) ;
  var x23a_out = x23a*Math.cos(-theta) + y23a*Math.sin(-theta) ;
  var y23a_out = y23a*Math.cos(-theta) - x23a*Math.sin(-theta) ;
  var x23b_out = x23b*Math.cos(-theta) + y23b*Math.sin(-theta) ;
  var y23b_out = y23b*Math.cos(-theta) - x23b*Math.sin(-theta) ;
  
  context.moveTo( u_from_x(x12a_out) , v_from_y(y12a_out) ) ;
  context.lineTo( u_from_x(x12b_out) , v_from_y(y12b_out) ) ;
  context.moveTo( u_from_x(x23a_out) , v_from_y(y23a_out) ) ;
  context.lineTo( u_from_x(x23b_out) , v_from_y(y23b_out) ) ;
  context.stroke() ;
}

function circle_from_points(x1, y1, x2, y2, x3, y3){
  var theta = 0 ;
  
  // First check for coincident points
  var tolerance = 1e-6 ;
  var coincident_points = false ;
  if( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) < tolerance*tolerance) coincident_points = true ;
  if( (x1-x3)*(x1-x3) + (y1-y3)*(y1-y3) < tolerance*tolerance) coincident_points = true ;
  if( (x2-x3)*(x2-x3) + (y2-y3)*(y2-y3) < tolerance*tolerance) coincident_points = true ;
  if(coincident_points){
    alert('Error: Some of your points are coincident.') ;
    return ;
  }
  
  // Second check for infinite gradients (change in y with no change in x)
  var infinite_gradients = true ;
  while(infinite_gradients){
    infinite_gradients = false ;
    if( (x1-x2)*(x1-x2) < tolerance*tolerance) infinite_gradients = true ;
    if( (x2-x3)*(x2-x3) < tolerance*tolerance) infinite_gradients = true ;
    if(infinite_gradients){
      theta = Math.PI*Math.random() ;
      var x1_out = x1*Math.cos(theta) + y1*Math.sin(theta) ;
      var y1_out = y1*Math.cos(theta) - x1*Math.sin(theta) ;
      var x2_out = x2*Math.cos(theta) + y2*Math.sin(theta) ;
      var y2_out = y2*Math.cos(theta) - x2*Math.sin(theta) ;
      var x3_out = x3*Math.cos(theta) + y3*Math.sin(theta) ;
      var y3_out = y3*Math.cos(theta) - x3*Math.sin(theta) ;
      
      x1 = x1_out ; y1 = y1_out ;
      x2 = x2_out ; y2 = y2_out ;
      x3 = x3_out ; y3 = y3_out ;
    }
  }
  
  // Finally check for colinearity
  var m12 = (x2-x1)/(y2-y1) ;
  var m23 = (x3-x2)/(y3-y2) ;
  
  if( (m12-m23)*(m12-m23) < tolerance*tolerance){
    alert('Error: Your points appear to be collinear.') ;
    return ;
  }
  
  function y12_from_x12(x_12){ return (y1+y2)/2 - m12*(x_12 - (x1+x2)/2) ; }
  function y23_from_x23(x_23){ return (y2+y3)/2 - m23*(x_23 - (x2+x3)/2) ; }
  
  var cx  = ( y1-y3 + (x1+x2)*m12 - (x2+x3)*m23 )/(2*(m12-m23)) ;
  var cy  = (y1+y2)/2 - m12*(cx-(x1+x2)/2) ;
  
  // Rotate everything back in case we had to rotate earlier
  var x1_out = x1*Math.cos(-theta) + y1*Math.sin(-theta) ;
  var y1_out = y1*Math.cos(-theta) - x1*Math.sin(-theta) ;
  var x2_out = x2*Math.cos(-theta) + y2*Math.sin(-theta) ;
  var y2_out = y2*Math.cos(-theta) - x2*Math.sin(-theta) ;
  var x3_out = x3*Math.cos(-theta) + y3*Math.sin(-theta) ;
  var y3_out = y3*Math.cos(-theta) - x3*Math.sin(-theta) ;
  var cx_out = cx*Math.cos(-theta) + cy*Math.sin(-theta) ;
  var cy_out = cy*Math.cos(-theta) - cx*Math.sin(-theta) ;
  
  x1 = x1_out ; y1 = y1_out ;
  x2 = x2_out ; y2 = y2_out ;
  x3 = x3_out ; y3 = y3_out ;
  cx = cx_out ; cy = cy_out ;
  
  var rho = Math.sqrt( (cx-x1)*(cx-x1) + (cy-y1)*(cy-y1) ) ;
  return [cx,cy,rho,m12,m23,theta] ;
}


