from rest_framework import permissions, viewsets, generics

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer

    allowed_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    # Custom DELETE action
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=204)

    # Custom PUT action
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    