import objc
from Cocoa import NSApplication, NSWindow, NSButton, NSTextView, NSScrollView, NSMakeRect, NSBackingStoreBuffered, NSApp, NSApplicationActivationPolicyRegular, NSObject, NSRunLoop, NSDefaultRunLoopMode

class AppDelegate(NSObject):
    def applicationDidFinishLaunching_(self, notification):
        self.window = NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(
            NSMakeRect(200.0, 300.0, 480.0, 320.0), 
            15,  # NSWindowStyleMaskTitled | NSWindowStyleMaskClosable | NSWindowStyleMaskResizable
            NSBackingStoreBuffered, 
            False
        )
        self.window.setTitle_("Simple Text Editor")
        self.window.makeKeyAndOrderFront_(None)
        
        # Create a ScrollView and TextView
        scrollView = NSScrollView.alloc().initWithFrame_(NSMakeRect(20, 50, 440, 220))
        scrollView.setHasVerticalScroller_(True)
        
        self.textView = NSTextView.alloc().initWithFrame_(NSMakeRect(0, 0, 440, 220))
        scrollView.setDocumentView_(self.textView)
        self.window.contentView().addSubview_(scrollView)

        # Add a save button
        saveButton = NSButton.alloc().initWithFrame_(NSMakeRect(190, 10, 100, 30))
        saveButton.setTitle_("Save Text")
        saveButton.setTarget_(self)
        saveButton.setAction_(objc.selector(self.saveText_, signature=b'v@:@'))
        self.window.contentView().addSubview_(saveButton)

    def saveText_(self, sender):
        text = self.textView.string()
        with open("saved_text.txt", "w") as file:
            file.write(text)
        print("Text saved to saved_text.txt")

if __name__ == "__main__":
    app = NSApplication.sharedApplication()
    delegate = AppDelegate.alloc().init()
    app.setDelegate_(delegate)
    app.setActivationPolicy_(NSApplicationActivationPolicyRegular)
    app.activateIgnoringOtherApps_(True)
    app.run()
