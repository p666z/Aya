/**
 * ZKKM Studio - Multi-Gender Theme System
 * Reusable functions for handling gender-specific content across themes
 */

// Apply gender-based visibility to all elements with data-gender attribute
function applyGenderSwitcher() {
    const pageGender = document.body.getAttribute('data-page-gender') || '🇮🇶👧';
    document.querySelectorAll('[data-gender]').forEach(function(element) {
        const genders = element.getAttribute('data-gender').split(' ').map(g => g.trim());
        if (genders.includes(pageGender)) {
            element.style.display = 'inline';
        } else {
            element.style.display = 'none';
        }
    });
}

// Extract only visible HTML content based on current page gender
function getVisibleHTML(element) {
    const pageGender = document.body.getAttribute('data-page-gender') || '🇮🇶👧';
    let result = '';
    
    Array.from(element.children).forEach(child => {
        if (child.hasAttribute('data-gender')) {
            const childGenders = child.getAttribute('data-gender').split(' ').map(g => g.trim());
            if (childGenders.includes(pageGender)) {
                result += child.innerHTML;
            }
        }
    });
    
    return result.trim();
}

// Type HTML content with animation (preserves Arabic text shaping)
function typeArabicHTML(container, html, speed = 50, callback) {
    container.innerHTML = "";

    // Parse HTML into nodes
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const nodes = [];
    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            nodes.push({ type: "text", text: node.textContent });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const clone = node.cloneNode(false);
            nodes.push({ type: "element", element: clone, children: Array.from(node.childNodes) });
        }
    }
    tempDiv.childNodes.forEach(traverse);

    function typeNode(idx = 0) {
        if (idx >= nodes.length) {
            if (callback) callback();
            return;
        }

        const node = nodes[idx];
        if (node.type === "text") {
            const span = document.createElement("span");
            container.appendChild(span);
            let charIdx = 0;

            function typeChar() {
                if (charIdx < node.text.length) {
                    // Append to a single text node to preserve Arabic shaping
                    span.textContent += node.text[charIdx];
                    charIdx++;
                    setTimeout(typeChar, speed);
                } else {
                    typeNode(idx + 1);
                }
            }

            typeChar();
        } else if (node.type === "element") {
            container.appendChild(node.element);

            if (node.children.length > 0) {
                // Flatten children into HTML and type recursively
                const childHtml = node.children.map(c => c.outerHTML || c.textContent).join('');
                typeArabicHTML(node.element, childHtml, speed, () => typeNode(idx + 1));
            } else {
                typeNode(idx + 1);
            }
        }
    }

    typeNode();
}

// Gender-aware love button templates
const genderTemplates = {
    '🇮🇶👧': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇮🇶👧">انتِ __USERNAME__؟</span><span data-gender="🇮🇶👦">انت __USERNAME__؟</span><span data-gender="🇺🇸👧">Are you __USERNAME__?</span><span data-gender="🇺🇸👦">Are you __USERNAME__?</span></p>',
    '🇮🇶👦': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇮🇶👧">انتِ __USERNAME__؟</span><span data-gender="🇮🇶👦">انت __USERNAME__؟</span><span data-gender="🇺🇸👧">Are you __USERNAME__?</span><span data-gender="🇺🇸👦">Are you __USERNAME__?</span></p>',
    '🇺🇸👧': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇮🇶👧">انتِ __USERNAME__؟</span><span data-gender="🇮🇶👦">انت __USERNAME__؟</span><span data-gender="🇺🇸👧">Are you __USERNAME__?</span><span data-gender="🇺🇸👦">Are you __USERNAME__?</span></p>',
    '🇺🇸👦': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇮🇶👧">انتِ __USERNAME__؟</span><span data-gender="🇮🇶👦">انت __USERNAME__؟</span><span data-gender="🇺🇸👧">Are you __USERNAME__?</span><span data-gender="🇺🇸👦">Are you __USERNAME__?</span></p>',
    '🇯🇴👧': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇯🇴👧">انتِ __USERNAME__؟</span><span data-gender="🇯🇴👦">انت __USERNAME__؟</span></p>',
    '🇯🇴👦': '<style>.lovein svg{animation:none;stroke:#ff0000;stroke-width:1.3;fill:none;width:35px;height:35px}</style><label class="lovein"><svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(2.550170, 3.550158)"><path d="M0.371729633,8.89614246 C-0.701270367,5.54614246 0.553729633,1.38114246 4.07072963,0.249142462 C5.92072963,-0.347857538 8.20372963,0.150142462 9.50072963,1.93914246 C10.7237296,0.0841424625 13.0727296,-0.343857538 14.9207296,0.249142462 C18.4367296,1.38114246 19.6987296,5.54614246 18.6267296,8.89614246 C16.9567296,14.2061425 11.1297296,16.9721425 9.50072963,16.9721425 C7.87272963,16.9721425 2.09772963,14.2681425 0.371729633,8.89614246 Z"></path><path d="M13.23843,4.013842 C14.44543,4.137842 15.20043,5.094842 15.15543,6.435842"></path></g></svg></label><p id="ket"><span data-gender="🇯🇴👧">انتِ __USERNAME__؟</span><span data-gender="🇯🇴👦">انت __USERNAME__؟</span></p>'
};

// Initialize gender-aware love button
function initGenderLoveButton(containerId) {
    const currentGender = document.body.getAttribute('data-page-gender') || '🇮🇶👧';
    const container = document.getElementById(containerId);
    if (container) {
        // Extract username from existing content before replacing
        const existingText = container.textContent || container.innerText || '';
        const usernameMatch = existingText.match(/(\S+)\s*؟?$/); // Match last word before optional ؟
        let username = '__USERNAME__';
        
        // Try to find username in the existing paragraph
        const existingP = container.querySelector('#ket');
        if (existingP) {
            const pText = existingP.textContent;
            // Try to extract from Arabic: "انتِ USERNAME؟" or English: "Are you USERNAME?"
            const arabicMatch = pText.match(/(?:انتِ|انت)\s+(.+?)؟/);
            const englishMatch = pText.match(/Are you\s+(.+?)\?/);
            if (arabicMatch && arabicMatch[1] !== '__USERNAME__') {
                username = arabicMatch[1];
            } else if (englishMatch && englishMatch[1] !== '__USERNAME__') {
                username = englishMatch[1];
            }
        }
        
        // Set template and replace placeholder with actual username
        let template = genderTemplates[currentGender] || genderTemplates['🇮🇶👧'];
        template = template.replace(/__USERNAME__/g, username);
        
        container.innerHTML = template;
        applyGenderSwitcher();
    }
}

// Run gender switcher on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGenderSwitcher);
} else {
    applyGenderSwitcher();
}
