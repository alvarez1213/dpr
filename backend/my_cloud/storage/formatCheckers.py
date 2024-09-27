from django.db.models import FileField

class MaxSizeFileField(FileField):
    """
        Field for storing a file and checking it's size
        * max_upload_size - a number indicating the maximum file size allowed for upload.
            100 Mb - 104857600
    """
    def __init__(self, *args, **kwargs):
        for key in kwargs.keys():
            print(key)
        self.max_upload_size = kwargs.pop("max_upload_size")

        super(MaxSizeFileField, self).__init__(*args, **kwargs)

    def clean(self, *args, **kwargs):        
        data = super(MaxSizeFileField, self).clean(*args, **kwargs)

        file = data.file
        if file._size > self.max_upload_size:
            raise SyntaxError('File is too large')      
        return data