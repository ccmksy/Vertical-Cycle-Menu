/* 
 * Vertical Cycle Menu - jQuery Plugin
 * 
 * Author : Mike Yeung - www.cloud-design.hk
 * License : Dual licensed under the MIT and GPL licenses
 * Version : 1.3.4
 * Last revised: 2014-03-03
 * 
 * Example :
 *  <ul class='vcmenu'>
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
            title_selector:             'span',
            notice_height:              'auto',
            notice_first_display:      false,
            notice_first_delay:        1000,
            notice_open_style:         '',                                    // default is slide
            notice_close_style:        '',                                    // default is slide
            notice_toggle_style:       '',                                    // default is slide
            button_method:             '',
            auto_loop:                  false,
            auto_interval:              3000
        };
        
        // Extend options
        var options = $.extend(defaults, options);         
        
        this.each(function() { 
            
            // Object variable
            var obj = $(this);     
            
            // CSS setting            
            $('ul', obj).css({
                'height':   options.notice_height           
            });
            $(options.title_selector, obj).css({
                'cursor': 'pointer'
            });                    

            //----------------------------------------------------------------------
            // Functions Setting
            // ---------------------------------------------------------------------    

            // Notice Action Style Function
            // Firstly choose ation, then secondly choose style
            function notice_action_style(selector, action, style, fn)
            {          
                if(action === 'open')
                {
                    switch(style)
                    {
                        case 'fade':    selector.fadeIn(fn);            break;
                            default:    selector.slideDown(fn);         break;
                    }
                }
                if(action === 'close')
                {
                    switch(style)
                    {
                        case 'fade':    selector.fadeOut(fn);            break;
                            default:    selector.slideUp(fn);            break;
                    }
                } 
                if(action === 'toggle')
                {
                    switch(style)
                    {
                        case 'fade':    selector.fadeToggle(fn);         break;
                            default:    selector.slideToggle(fn);        break;
                    }
                }                   
            }

            // Notice First Function
            function notice_first(time, fn)
            {   
               notice_action_style( $(options.title_selector, obj).first().addClass("active").next("ul").delay(time), 'open', 'slide', fn );
            }

            // Auto Run Function
            function auto_run()
            { 
                if (timer !== null) return;
                timer = setInterval(function () 
                {
                    index += 1;
                    index %= $(options.title_selector, obj).length;                    
                    notice_action_style( $(".active", obj).removeClass("active").next("ul"), 'close', 'slide' );
                    notice_action_style( $(options.title_selector, obj).eq(index).addClass("active").next("ul"), 'open', 'fade' );
                    
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
                                 notice_action_style( $(this).next("ul"), 'toggle', 'fade' );
                             }
                             else
                             {                                 
                                 notice_action_style( $(".active", obj).removeClass("active").next("ul"), 'close', 'fade' );
                                 notice_action_style( $(this).addClass("active").next("ul"), 'open', 'slide' );
                             }
                             index = $(options.title_selector).index( this );
                         });                     
                        break;
                    default:
                        $("li", obj).on("click", function(){
                            notice_action_style( $("ul", this), 'toggle' );
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
