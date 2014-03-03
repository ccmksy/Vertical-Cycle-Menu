/* 
 * Vertical Cycle Menu - jQuery Plugin
 * 
 * Author : Mike Yeung - www.cloud-design.hk
 * License : Dual licensed under the MIT and GPL licenses
 * Version : 1.3.3
 * Last revised: 2014-03-03
 * 
 * Example :
 *  <ul>
 *      <li><span>Item1</span>
 *          <ul>
 *              <li>sub item 1 </li>
 *              <li>sub item 2 </li>
 *          </ul>
 *      </li>
 *      <li><span>Item2</span>
 *          <ul>
 *              <li>sub item 1 </li>
 *              <li>sub item 2 </li>
 *          </ul>
 *      </li>      
 *  </ul>
 * 
 */

$(function(){
    
    $.fn.vcmenu = function(options){
        
        //----------------------------------------------------------------------
        // Basic Setting
        // ---------------------------------------------------------------------
        
        // Default configuration properties
        var defaults = {
            title_selector:               'span',
            notice_height:              'auto',
            notice_first_display:         false,
            notice_first_delay:           500,
            notice_open_style:          'slide',
            button_method:             'default',
            auto_loop:                  false,
            auto_interval:               3000
        };
        
        // Extend options
        var options = $.extend(defaults, options); 
        
        
        this.each(function() { 
            
            // Object variable
            var obj = $(this);        
        

            //----------------------------------------------------------------------
            // Functions Setting
            // ---------------------------------------------------------------------    

            // Notice Open Style Function
            function open_style(selector, style, method, fn)
            {            
                if(style === 'slide/fade')
                {
                    switch(method)
                    {
                        case 'open':    selector.slideDown(fn);     break;
                        case 'close':   selector.fadeOut(fn);       break;
                        default:        selector.slideToggle(fn);   break;
                    }  
                }              
                if(style === 'fade/slide')
                {
                    switch(method)
                    {
                        case 'open':    selector.fadeIn(fn);        break;
                        case 'close':   selector.slideUp(fn);       break;
                        default:        selector.fadeToggle(fn);    break;
                    }  
                }                
                if(style === 'fade')
                {
                    switch(method)
                    {
                        case 'open':    selector.fadeIn(fn);        break;
                        case 'close':   selector.fadeOut(fn);       break;
                        default:        selector.fadeToggle(fn);    break;
                    }  
                }                        
                if(style === 'slide')
                {
                    switch(method)
                    {
                        case 'open':    selector.slideDown(fn);     break;
                        case 'close':   selector.slideUp(fn);       break;
                        default:        selector.slideToggle(fn);   break;
                    }  
                }
            }

            // Notice First Function
            function notice_first(time, fn)
            {
               open_style( $(options.title_selector, obj).first().addClass("active").next("ul").delay(time), options.notice_open_style, 'open', fn);                         
            }

            // Auto Run Function
            function auto_run()
            { 
                if (timer !== null) return;
                timer = setInterval(function () 
                {
                    index += 1;
                    index %= $(options.title_selector, obj).length;
                    open_style( $(".active", obj).removeClass("active").next("ul"), options.notice_open_style, 'close');
                    open_style( $(options.title_selector, obj).eq(index).addClass("active").next("ul"), options.notice_open_style, 'open');
                }, interval);                         
            }      

            // Button Function
            function button(method) 
            {
                switch(method)
                {
                    case 2:
                        $(options.title_selector, obj).on("click", function(){
                             var own_class = $(this).attr("class");
                             if(own_class === "active")
                             {
                                 //open_style( $(".active").next("ul"), options.notice_open_style);
                                 open_style( $(this).next("ul"), options.notice_open_style);
                             }
                             else
                             {
                                 open_style( $(".active", obj).removeClass("active").next("ul"), options.notice_open_style, 'close');
                                 open_style( $(this).addClass("active").next("ul"), options.notice_open_style, 'open');
                             }
                             index = $(options.title_selector).index( this );
                         });                     
                        break;
                    default:
                        $("li", obj).on("click", function(){
                            open_style( $("ul", this), options.notice_open_style);
                        });                    
                        break;
                }                      
            }        

            //----------------------------------------------------------------------
            // Flow Control Setting
            // ---------------------------------------------------------------------          


            // Auto loop
            if(options.auto_loop)
            {         
                var timer = null,
                interval = options.auto_interval,
                index = 0;                  

                $("li", obj).on("mouseover",function(){
                    clearInterval(timer);
                    timer = null;            
                }).on("mouseleave", auto_run); 

                notice_first(options.notice_first_delay, auto_run);

                button(2);
            }
            else
            {
                if(options.notice_first_display)
                {
                    notice_first(options.notice_first_delay);
                }                

                button(options.button_method);
            }        
        
        });

    };    
    
});
