// http://www.codestore.net/store.nsf/unid/EPSD-5DTT4L

class Dashboard_Widget {

    /**
     * [constructor description]
     */
    constructor ( id, params ) {
        this.s = Snap( id ); // Our drawing surface
        this.circumference = 2 * Math.PI * parseInt( params.radius );// Omtrek cirkel
        this.color = {
            base: params.color.base,
            lighter: params.color.lighter,
        };
        this.height = parseInt( params.radius*2 );
        this.label = params.label;
        this.mask = null;
        this.pie = null;
        this.radius = params.radius;
        this.slices = [];
        this.values = params.values;
        this.width = parseInt( params.radius*2 );

        // Start drawing ...
        this.setSurface();
        this.setMask();
        this.setSlices();
        this.setPie();
    }

    /**
     * [setSurface description]
     */
    setSurface() {
        this.s.attr({
            height: this.height,
            width: this.width
        });
    }

    /**
     * Like Photoshop masks :
     * Create a group. The black part will be shown, 
     * use gray to filter a percentage and white 
     * is hidden.
     */
    setMask() {
        this.mask = this.s.group( 
            this.s.circle( this.radius, this.radius, this.radius ).attr({fill: '#fff'}), 
            this.s.circle( this.radius, this.radius, ( this.radius * 0.9 ) ).attr({fill: '#000'}) 
        );
    }

    /**
     * [setSlices description]
     */
    setSlices() {

        /**
         * Note that functions like sin, cos, and so on do not return angles, 
         * they take angles as input.
         *
         * Both Math.sin() and Math.cos() methods returns a numeric value between -1 and 1.
         */
        var angle   = 0,
            colors  = [ '#F00', '#0F0', '#00F', '#F0F', '#FF0', '#0FF' ],
            lineX   = this.radius - ( Math.cos( 0 ) * this.radius ),
            lineY   = this.radius - ( Math.sin( 0 ) * this.radius ),
            arcX    = 0,
            arcY    = 0;

        for ( var i=0, len=this.values.length; i<len; i++) {

            var percentage  = parseFloat( this.values[i].percentage ),
                radii       = this.getRadii( percentage );
                
            angle   = angle + this.getAngle( percentage );
            arcX    = this.radius - ( Math.cos( this.toRadians( angle ) ) * this.radius );
            arcY    = this.radius - ( Math.sin( this.toRadians( angle ) ) * this.radius );

            this.slices.push( this.newSlice( this.values[i].label, lineX, lineY, arcX, arcY, radii, colors[i] ) );

            lineX = arcX;
            lineY = arcY;
        }
    }

    /**
     * [setPie description]
     */
    setPie() {

        var self        = this,
            outerCircle = this.s.circle( this.radius, this.radius, this.radius ).attr({ fill: this.color.base }),
            innerCircle = this.s.circle( this.radius, this.radius, ( this.radius -1 ) ).attr({ fill: this.s.gradient('r(0.35, 0.35, 0.5)' + this.color.base + '-' + this.color.lighter) }),
            time        = Math.ceil( Math.random() * 10 ) * 200,
            slices      = this.slices;
            
        this.pie = this.s.group( outerCircle ).attr({
            mask: this.mask
        });

        for ( var i=0, len=this.slices.length; i<len; i++) {
            this.pie.append( this.slices[i] );
        }

        innerCircle.animate({r: ( this.radius * 0.84 )}, time, null, function () {

            for ( var i=0, len=self.slices.length; i<len; i++) {
                var time = Math.ceil( Math.random() * 10 ) * 300;
                self.slices[i].animate({ 'fill-opacity': 0.5 }, time );
            }
        });

        var line1 = this.s.text( this.radius, this.radius, this.label.number ).attr({
            fill: '#fff',
            'font-size': ( this.width*2 ) + '%',
            'text-anchor': 'middle'
        });

        var line2 = this.s.text( this.radius, ( this.height/1.5 ), this.label.text ).attr({
            fill: '#fff',
            'font-size': ( this.width/1.5 ) + '%',
            'text-anchor': 'middle'
        });

        this.s.group( innerCircle, line1, line2 );
    }

    /**
     * [newSlice description]
     */
    newSlice( label, lineX, lineY, arcX, arcY, radii, fill ) {

        var slice = this.s.path( Snap.format( "M{moveTo.x},{moveTo.y} L{lineTo.x},{lineTo.y} A{arcTo.radii},{arcTo.radii} 0 {arcTo.rotation} {arcTo.endX},{arcTo.endY} Z", {
            moveTo: {
                x: this.radius,
                y: this.radius
            },
            lineTo: {
                x: lineX,
                y: lineY
            },
            arcTo: {
                radii: radii,
                rotation: '0,1', // clockwise 0,1 or counterclockwise 1,0
                endX: arcX,
                endY: arcY
            }
        }));

        slice
            .attr({ 
                fill: fill,
                'fill-opacity': 0,
                cursor: 'pointer'
            })
            .mouseover( function () {
                slice.attr({
                    'fill-opacity': 1,
                });
            })
            .mouseout( function () {
                slice.attr({
                    'fill-opacity': 0.5,
                });
            })
            .click( function () {
                console.log('Slice of pie "' + label + '"');
            });

        return slice;
    }

    /**
     * [toDegrees description]
     */
    toDegrees( radians ) {
        return radians * ( 180 / Math.PI );
    }

    /**
     * [toRadians description]
     */
    toRadians ( degrees ) {
        return degrees * ( Math.PI / 180 );
    }

    /**
     * [getAngle description]
     */
    getAngle( percentage ) {
        return Math.round( 360 / 100 * percentage );
    }

    /**
     * [getRadii description]
     */
    getRadii( percentage ) {
        // return ( this.circumference / 100 * percentage ) * this.radius;
        return this.radius;
    }
}
