Goal: Adjust vue-advance-cropper size

Docs:
- Can set cropper width, height by parent div of <cropper /> or style directly on <cropper />

1. Set popup to 2 part
    + Upper = 90% height (<div ref="modalUpper" class="modal-upper"></div>)
    + Bottom = 10% height for buttons

2. Create parent div for cropper inside modalUpper
    <div ref="cropperContainer" class="cropper-container"></div>

3. Create a updateContainerSize() function
    - Run when onMounted, window size change event, aspect ratio change
    - Extract width/height from modalUpper
    - Setting new width, height of cropperContainer by aspect ratio but ensure both new size smaller than modalUpper