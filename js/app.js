/**
 * Jazztips Spotify app
 * code by @urre
 */
    require([
            '$api/models',
            '$api/location#Location',
            '$api/search#Search',
            '$api/toplists#Toplist',
            '$views/buttons#PlayButton',
            '$views/list#List',
            '$views/image#Image',
            '$views/throbber#Throbber',
            ], function(models, Location, Search, Toplist, PlayButton, List, Image, Throbber) {

            models.application.load('arguments').done(getRecords);

            function getRecords() {

                    var
                    tracks   = document.getElementById('index'),
                    throbber = Throbber.forElement(tracks),
                    artist_name, album_name;

                    var url = 'http://jazzti.ps/?json=1&post_type=skiva&custom_fields=*';

                    $.ajax({
                        url: url,
                        dataType: 'jsonp',
                        success: function(data) {

                          $.each(data.posts, function (i, item) {

                            var img     = item.attachments[0].url;
                            var title   = item.title;
                            var spotify = item.spotify;
                            var url     = item.url;
                            var album   = models.Album.fromURI(spotify);

                            var image = Image.forAlbum(album, {width: 180, height: 180});
                            var recordHolder = $('<div class="record"><div class="cover"></div><h3>'+title+'</h3><p><a href="'+url+'">Visa tips</a></p><input type="button" class="subscribe" value="Spara som spellista" />');
                            var artist_name, album_name;

                            recordHolder.find('.subscribe').on('click', function() {

                            models.Playlist.create(artist_name+' - '+album_name).done(function(p){
                                album.load('tracks').done(function(){

                                    album.tracks.snapshot().done(function(snapshot) {
                                            p.load('tracks', 'subscribed').done(function(){
                                                $.each(snapshot._uris, function(i, track){
                                                    p.tracks.add(models.Track.fromURI(track));
                                                });
                                            });

                                        });

                                    });

                                });
                            });

                            album.load('artists').done(function(){
                                artist_name = album.artists[0].name;
                                album_name = album.name;
                                image.setOverlay(album_name, artist_name);
                            });

                            image.setPlayer(true);
                            recordHolder.find('.cover').html(image.node)
                            $('.albums').append(recordHolder);

                          });

                          throbber.hide();
                        }

                      });

            };

    });
