// Function to save data to Chrome's storage

function saveData() {
  const contactInfo = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    homepage: document.getElementById("homepage").value,
    instagram: document.getElementById("instagram").value,
    twitter: document.getElementById("twitter").value,
    snapchat: document.getElementById("snapchat").value,
    reddit: document.getElementById("reddit").value,
    pinterest: document.getElementById("pinterest").value,
    tiktok: document.getElementById("tiktok").value,
    youtube: document.getElementById("youtube").value,
    discord: document.getElementById("discord").value,
    twitch: document.getElementById("twitch").value,
    linkedin: document.getElementById("linkedin").value,
    facebook: document.getElementById("facebook").value,
    birthday: document.getElementById("birthday").value,
    notes: document.getElementById("notes").value,
  };

  chrome.storage.local.set({ contactInfo });
}

// Function to load data from Chrome's storage
function loadData() {
  chrome.storage.local.get("contactInfo", (result) => {
    if (result.contactInfo) {
      document.getElementById("first-name").value =
        result.contactInfo.firstName || "";
      document.getElementById("last-name").value =
        result.contactInfo.lastName || "";
      document.getElementById("phone").value = result.contactInfo.phone || "";
      document.getElementById("email").value = result.contactInfo.email || "";
      document.getElementById("homepage").value =
        result.contactInfo.homepage || "";
      document.getElementById("instagram").value =
        result.contactInfo.instagram || "";
      document.getElementById("twitter").value =
        result.contactInfo.twitter || "";
      document.getElementById("snapchat").value =
        result.contactInfo.snapchat || "";
      document.getElementById("reddit").value = result.contactInfo.reddit || "";
      document.getElementById("pinterest").value =
        result.contactInfo.pinterest || "";
      document.getElementById("tiktok").value = result.contactInfo.tiktok || "";
      document.getElementById("youtube").value =
        result.contactInfo.youtube || "";
      document.getElementById("discord").value =
        result.contactInfo.discord || "";
      document.getElementById("twitch").value = result.contactInfo.twitch || "";
      document.getElementById("linkedin").value =
        result.contactInfo.linkedin || "";
      document.getElementById("facebook").value =
        result.contactInfo.facebook || "";
      document.getElementById("birthday").value =
        result.contactInfo.birthday || "";
      document.getElementById("notes").value = result.contactInfo.notes || "";
    }
  });
}

// Save data whenever an input field or the notes textarea changes
document.querySelectorAll("input, textarea").forEach((element) => {
  element.addEventListener("input", saveData);
});

// Load data when the popup is opened
document.addEventListener("DOMContentLoaded", loadData);

// Export functionality (remains the same)
document.getElementById("export").addEventListener("click", () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const homepage = document.getElementById("homepage").value;
  const instagram = document.getElementById("instagram").value;
  const twitter = document.getElementById("twitter").value;
  const snapchat = document.getElementById("snapchat").value;
  const reddit = document.getElementById("reddit").value;
  const pinterest = document.getElementById("pinterest").value;
  const tiktok = document.getElementById("tiktok").value;
  const youtube = document.getElementById("youtube").value;
  const discord = document.getElementById("discord").value;
  const twitch = document.getElementById("twitch").value;
  const linkedin = document.getElementById("linkedin").value;
  const facebook = document.getElementById("facebook").value;
  const birthday = document.getElementById("birthday").value;
  const notes = document.getElementById("notes").value;

  const vCard = `BEGIN:VCARD
VERSION:3.0
PRODID:-//Apple Inc.//macOS 15.0//EN
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
EMAIL;type=INTERNET;type=HOME;type=pref:${email}
TEL;type=CELL;type=VOICE;type=pref:${phone}
NOTE:${notes}
item1.URL;type=pref:${homepage}
item1.X-ABLabel:_$!<HomePage>!$_
item2.URL:${instagram}
item2.X-ABLabel:Instagram
item3.URL:${twitter}
item3.X-ABLabel:Twitter
item4.URL:${snapchat}
item4.X-ABLabel:Snapchat
item5.URL:${reddit}
item5.X-ABLabel:Reddit
item6.URL:${pinterest}
item6.X-ABLabel:Pinterest
item7.URL:${tiktok}
item7.X-ABLabel:TikTok
item8.URL:${youtube}
item8.X-ABLabel:YouTube
item9.URL:${discord}
item9.X-ABLabel:Discord
item10.URL:${twitch}
item10.X-ABLabel:Twitch
item11.URL:${linkedin}
item11.X-ABLabel:LinkedIn
item12.URL:${facebook}
item12.X-ABLabel:Facebook
BDAY:${birthday}
END:VCARD`;

  const blob = new Blob([vCard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${firstName} ${lastName}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
});

// Delete functionality (clear input fields, notes, and storage)
document.getElementById("delete").addEventListener("click", () => {
  // Clear all input fields
  document
    .querySelectorAll("input, textarea")
    .forEach((element) => (element.value = ""));

  // Remove the stored data
  chrome.storage.local.remove("contactInfo");
});
